// app/admin/billing/subscriptions/components/SubscriptionsMetrics.tsx
import styles from "./SubscriptionsMetrics.module.css";
import { getSubscriptionMetrics } from "../data";

export async function SubscriptionsMetrics() {
  const m = await getSubscriptionMetrics();

  return (
    <section className={styles.grid}>
      <Card label='Active Subs' value={m.activeCount} />
      <Card label='Trialing' value={m.trialingCount} />
      <Card label='Past Due' value={m.pastDueCount} tone='warn' />
      <Card label='MRR' value={fmtCurrency(m.mrrCents)} />
    </section>
  );
}

function Card({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: "ok" | "warn" | "bad";
}) {
  return (
    <div className={`${styles.card} ${tone ? styles[tone] : ""}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

function fmtCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
