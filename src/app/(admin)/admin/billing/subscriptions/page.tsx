// app/admin/billing/subscriptions/page.tsx
import { Suspense } from "react";
import styles from "./SubscriptionsPage.module.css";
import { SubscriptionsMetrics } from "@/components/admin/SubscriptionsMetrics/SubscriptionsMetrics";
import { SubscriptionsFilters } from "@/components/admin/SubscriptionsFilters/SubscriptionsFilters";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable/SubscriptionsTable";

export const runtime = "nodejs";

type Search = {
  plan?: string; // PlanTier enum value
  status?: string; // SubStatus enum value
  q?: string; // search by user name/email
  page?: string; // 1-based
};

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<Search>; // ← expect a Promise here
}) {
  const sp = await searchParams; // ← await it

  const page = Math.max(parseInt(sp.page ?? "1", 10) || 1, 1);
  const plan = sp.plan ?? "";
  const status = sp.status ?? "";
  const q = (sp.q ?? "").trim();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Subscriptions</h1>
      </header>

      <Suspense fallback={<div className={styles.card}>Loading metrics…</div>}>
        <SubscriptionsMetrics />
      </Suspense>

      <div className={styles.card}>
        <SubscriptionsFilters initial={{ plan, status, q }} />
        <Suspense
          key={`${plan}-${status}-${q}-${page}`}
          fallback={<div>Loading subscriptions…</div>}
        >
          <SubscriptionsTable page={page} plan={plan} status={status} q={q} />
        </Suspense>
      </div>
    </div>
  );
}
