// app/admin/components/KPIGrid.tsx
import { getAdminKPIs } from "../data";
import styles from "./KPIGrid.module.css";

export async function KPIGrid() {
  const kpis = await getAdminKPIs(); // { activeCount, mrr, upcomingCount, atRiskCount }

  return (
    <div className={styles.grid}>
      <KPI title='Active Subscriptions' value={kpis.activeCount.toString()} />
      <KPI title='MRR' value={formatCurrency(kpis.mrr)} />
      <KPI title='Renewing in 30 days' value={kpis.upcomingCount.toString()} />
      <KPI title='At Risk (past_due)' value={kpis.atRiskCount.toString()} />
    </div>
  );
}

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.kpiTitle}>{title}</div>
      <div className={styles.kpiValue}>{value}</div>
    </div>
  );
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
