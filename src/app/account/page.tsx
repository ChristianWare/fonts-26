/* eslint-disable @typescript-eslint/no-explicit-any */
// app/account/page.tsx
import styles from "./AccountPage.module.css";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Stripe from "stripe";
// import BillingZone from "@/components/account/BillingZone/BillingZone";
import ChargesTable from "@/components/account/ChargesTable/ChargesTable";
import { AccountKPIGrid } from "@/components/account/AccountKPIGrid/AccountKPIGrid";
import UserButton from "@/components/dashboard/UserButton/UserButton";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

function readSubField<T = unknown>(
  obj: unknown,
  snake: string,
  camel: string
): T | undefined {
  const o = obj as any;
  return (o?.[snake] ?? o?.[camel]) as T | undefined;
}

function mapStripeSub(s: Stripe.Subscription) {
  const price = (s as any)?.items?.data?.[0]?.price ?? null;
  const nextUnix =
    readSubField<number>(s, "trial_end", "trialEnd") ??
    readSubField<number>(s, "current_period_end", "currentPeriodEnd") ??
    null;

  return {
    stripeSubscriptionId: s.id,
    stripePriceId: price?.id ?? "",
    planTier: ((s.metadata?.planTier as string | undefined) ??
      (price?.nickname as string | undefined) ??
      null) as string | null,
    status: s.status as string,
    unitAmount: (readSubField<number>(price, "unit_amount", "unitAmount") ??
      null) as number | null,
    nextBillDate: nextUnix ? new Date(nextUnix * 1000) : null,
    cancelAtPeriodEnd: (readSubField<boolean>(
      s,
      "cancel_at_period_end",
      "cancelAtPeriodEnd"
    ) ?? false) as boolean,
    currency: ((price?.currency as string | undefined) ?? "usd").toUpperCase(),
  };
}

function readablePlan(p?: string | null) {
  switch (p) {
    case "SOLO":
      return "Solo";
    case "TEAM":
      return "Team";
    case "RENTAL_FLEET":
      return "Rental/Fleet";
    case "MULTI_LOCATION":
      return "Multi-Location";
    case "CUSTOM":
      return "Custom";
    default:
      return "—";
  }
}

function currency(cents?: number | null, code = "USD") {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.detail}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const where = session.user?.id
    ? { id: session.user.id }
    : session.user?.email
      ? { email: session.user.email }
      : null;
  if (!where) redirect("/login");

  const user = await db.user.findUnique({
    where,
    include: {
      subscriptions: {
        where: { status: { in: ["active", "trialing"] } },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user) redirect("/login");

  let sub = user.subscriptions?.[0] ?? null;

  let live: {
    planTier: string | null;
    status: string | null;
    unitAmount: number | null;
    nextBillDate: Date | null;
    cancelAtPeriodEnd: boolean;
    currency: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
  } | null = null;

  if (user.stripeCustomerId) {
    // const needsLive = !sub || sub.planTier == null || sub.unitAmount == null;

    const needsLive =
      !sub ||
      sub.planTier == null ||
      sub.unitAmount == null ||
      sub.currentPeriodEnd == null;

    if (needsLive) {
      const list = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "all",
        limit: 1,
        expand: ["data.items.data.price"],
      });
      const s = list.data[0] as Stripe.Subscription | undefined;
      if (s) {
        const mapped = mapStripeSub(s);
        live = {
          planTier: mapped.planTier,
          status: mapped.status,
          unitAmount: mapped.unitAmount,
          nextBillDate: mapped.nextBillDate,
          cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
          currency: mapped.currency,
          stripeSubscriptionId: mapped.stripeSubscriptionId,
          stripePriceId: mapped.stripePriceId,
        };

        if (!sub) {
          await db.subscription.upsert({
            where: { stripeSubscriptionId: mapped.stripeSubscriptionId },
            create: {
              stripeSubscriptionId: mapped.stripeSubscriptionId,
              stripePriceId: mapped.stripePriceId,
              userId: user.id,
              planTier: (mapped.planTier as any) ?? "CUSTOM",
              status: mapped.status as any,
              unitAmount: mapped.unitAmount ?? 0,
              currency: mapped.currency ?? "USD",
              currentPeriodEnd: mapped.nextBillDate,
              cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
              setupFeePaidAt: null,
              meta: {},
            },
            update: {
              stripePriceId: mapped.stripePriceId,
              planTier: (mapped.planTier as any) ?? "CUSTOM",
              status: mapped.status as any,
              unitAmount: mapped.unitAmount ?? 0,
              currency: mapped.currency ?? "USD",
              currentPeriodEnd: mapped.nextBillDate,
              cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
            },
          });

          const refreshed = await db.subscription.findFirst({
            where: {
              userId: user.id,
              stripeSubscriptionId: mapped.stripeSubscriptionId,
            },
            orderBy: { updatedAt: "desc" },
          });
          if (refreshed) {
            sub = refreshed;
          }
        } else {
          const shouldPatch =
            sub.planTier !== mapped.planTier ||
            sub.unitAmount !== (mapped.unitAmount ?? undefined) ||
            sub.currency.toUpperCase() !== (mapped.currency ?? "USD") ||
            !!sub.cancelAtPeriodEnd !== !!mapped.cancelAtPeriodEnd;

          if (shouldPatch) {
            await db.subscription.update({
              where: { id: sub.id },
              data: {
                planTier: (mapped.planTier as any) ?? sub.planTier,
                unitAmount: mapped.unitAmount ?? sub.unitAmount,
                currency: mapped.currency ?? sub.currency,
                status: mapped.status as any,
                currentPeriodEnd: mapped.nextBillDate,
                cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
                stripePriceId: mapped.stripePriceId || sub.stripePriceId,
              },
            });

            const refreshed = await db.subscription.findUnique({
              where: { id: sub.id },
            });
            sub = refreshed ?? sub;
          }
        }
      }
    }
  }

  const planLabel = readablePlan(
    (sub?.planTier as string | undefined) ?? live?.planTier ?? null
  );
  const statusLabel =
    (sub?.status as string | undefined) ?? live?.status ?? "—";
  const amountCents =
    (sub?.unitAmount as number | undefined) ??
    (live?.unitAmount as number | undefined) ??
    null;
  const curr = (sub?.currency ?? live?.currency ?? "USD") as string;
  const nextBill =
    sub?.currentPeriodEnd ??
    (live?.nextBillDate ? new Date(live.nextBillDate) : null);
  const renews =
    (sub?.cancelAtPeriodEnd ?? live?.cancelAtPeriodEnd ?? false)
      ? "Will cancel at period end"
      : "Auto-renew on next bill date";

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.heading}>Hello, {user?.name ?? "User"}!</h1>
        <p className={styles.copy}>Welcome back to your account dashboard.</p>
        <AccountKPIGrid />
      </div>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <div className={styles.grid}>
          <Detail label='Name' value={user?.name ?? "—"} />
          <Detail label='Email' value={user?.email ?? "—"} />
          <Detail
            label='Billing'
            value={
              user?.stripeCustomerId ? (
                <a
                  href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
                  target='_blank'
                  className={styles.ext}
                >
                  View in Stripe ↗
                </a>
              ) : (
                "—"
              )
            }
          />
        </div>
      </section>

      <section className={styles.card}>
        {" "}
        <h2 className={styles.sectionTitle}>Plan Details</h2>
        {sub || live ? (
          <div className={styles.grid}>
            <Detail label='Plan:' value={planLabel} />
            <Detail label='Status:' value={statusLabel} />
            <Detail
              label='Cost:'
              value={`${currency(amountCents, curr)}/month`}
            />
            <Detail
              label='Next bill:'
              value={nextBill ? format(new Date(nextBill), "MMM d, yyyy") : "—"}
            />
            <Detail label='Renews' value={renews} />
          </div>
        ) : (
          <p className={styles.muted}>
            You don’t have a subscription yet. Choose a plan to get started.
          </p>
        )}
      </section>
      <section className={styles.card}>
        {sub || live ? (
          <>
            {/* Only first 5 + link to full history */}
            <ChargesTable limit={5} showViewAllLink />
          </>
        ) : (
          <Link href='/pricing' className={styles.primaryLink}>
            View plans
          </Link>
        )}
      </section>

      <section className={styles.card}>
        <UserButton />
      </section>
    </div>
  );
}
