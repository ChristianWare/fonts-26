/* eslint-disable @typescript-eslint/no-explicit-any */
// app/account/success/page.tsx
import styles from "./SuccessPage.module.css";
import Stripe from "stripe";
import { format } from "date-fns";
import Button from "@/components/shared/Button/Button";
import ConfettiOnMount from "@/components/ConfettiOnMount/ConfettiOnMount";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const sessionId = sp.session_id;

  if (!sessionId) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription", "customer"],
  });

  if (session.status !== "complete" || session.payment_status !== "paid") {
    redirect("/");
  }

  const sub = session.subscription as Stripe.Subscription | null;
  const planTier =
    (sub?.metadata?.planTier as string | undefined) ??
    sub?.items?.data?.[0]?.price?.nickname ??
    undefined;
  const unitAmount = sub?.items?.data?.[0]?.price?.unit_amount ?? null;
  const currency = (
    sub?.items?.data?.[0]?.price?.currency ?? "usd"
  ).toUpperCase();
  // Stripe types may not include current_period_end; use type assertion to access it safely
  const nextTs =
    sub?.trial_end ??
    (sub && (sub as any).current_period_end) ??
    null;

  const nextBill = nextTs
    ? format(new Date(nextTs * 1000), "MMM d, yyyy")
    : null;

  return (
    <main className={styles.container}>
      <ConfettiOnMount />
      <section className={styles.card}>
        <h1 className={styles.title}>You’re all set 🎉</h1>
        <p className={styles.lead}>
          Thanks for subscribing
          {planTier ? ` to ${readablePlan(planTier)}` : ""}!
        </p>

        <div className={styles.detailsGrid}>
          <Detail
            label='Plan'
            value={planTier ? readablePlan(planTier) : "—"}
          />
          <Detail
            label='Monthly amount'
            value={unitAmount != null ? currencyFmt(unitAmount, currency) : "—"}
          />
          <Detail label='Next bill' value={nextBill ?? "—"} />
        </div>

        <div className={styles.notice}>
          Your one-time setup fee was charged today. Your monthly plan will
          start on the next bill date above.
        </div>

        <div className={styles.actions}>
          {/* <Link href='/account' className={styles.primaryBtn}>
            Go to dashboard
          </Link>
          <Link href='/' className={styles.textLink}>
            Back to home
          </Link> */}
          <Button href='/account' btnType='black' text='Go to dashboard' />
          <Button href='/' btnType='blackOutline' text='Back to home' />
        </div>
      </section>
    </main>
  );
}

function currencyFmt(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function readablePlan(p: string) {
  switch (p) {
    case "SOLO":
    case "Solo":
      return "Solo";
    case "TEAM":
    case "Team":
      return "Team";
    case "RENTAL_FLEET":
    case "Rental/Fleet":
      return "Rental/Fleet";
    case "MULTI_LOCATION":
    case "Multi-Location":
      return "Multi-Location";
    default:
      return p;
  }
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.detail}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
