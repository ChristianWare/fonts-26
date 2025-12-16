/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/users/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getUserDetails } from "@/components/admin/data";
import Link from "next/link";
import { format } from "date-fns";
import styles from "./UserDetail.module.css";
import DangerZone from "@/components/admin/DangerZone/DangerZone";

export const runtime = "nodejs";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const { id } = await params;
  const user = await getUserDetails(id);
  if (!user) return notFound();

  const sub = user.subscriptions?.[0];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <Link href='/admin' className={styles.back}>
          ← Back to Admin
        </Link>
      </header>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <div className={styles.grid}>
          <Detail label='Name' value={user.name ?? "—"} />
          <Detail label='Email' value={user.email} />
          <Detail label='Role' value={user.role} />
          <Detail
            label='Created'
            value={format(new Date(user.createdAt), "MMM d, yyyy")}
          />
          <Detail
            label='Stripe Customer'
            value={
              user.stripeCustomerId ? (
                <Link
                  href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
                  target='_blank'
                  className={styles.link}
                >
                  {user.stripeCustomerId}
                </Link>
              ) : (
                "—"
              )
            }
          />
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Subscription</h2>
        {sub ? (
          <div className={styles.grid}>
            <Detail label='Plan' value={sub.planTier} />
            <Detail label='Status' value={sub.status} />
            <Detail
              label='Amount'
              value={sub.unitAmount != null ? currency(sub.unitAmount) : "—"}
            />
            <Detail
              label='Next bill'
              value={
                sub.currentPeriodEnd
                  ? format(new Date(sub.currentPeriodEnd), "MMM d, yyyy")
                  : "—"
              }
            />
            <Detail
              label='Cancel at period end'
              value={sub.cancelAtPeriodEnd ? "Yes" : "No"}
            />
            <Detail
              label='Stripe Subscription'
              value={
                sub.stripeSubscriptionId ? (
                  <Link
                    href={`https://dashboard.stripe.com/subscriptions/${sub.stripeSubscriptionId}`}
                    target='_blank'
                    className={styles.link}
                  >
                    {sub.stripeSubscriptionId}
                  </Link>
                ) : (
                  "—"
                )
              }
            />
          </div>
        ) : (
          <p className={styles.muted}>No subscription on file.</p>
        )}
      </section>

      <DangerZone
        userId={user.id}
        currentPlan={sub?.planTier as any}
        hasActiveSub={!!sub}
      />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.detail}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

function currency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
