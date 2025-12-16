// components/account/AccountKPIGrid/AccountKPIGrid.tsx
import styles from "./AccountKPIGrid.module.css";
import { auth } from "../../../../auth"; 
import { db } from "@/lib/db";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function AccountKPIGrid() {
  const session = await auth();
  if (!session) return null;

  const where = session.user?.id
    ? { id: session.user.id }
    : session.user?.email
      ? { email: session.user.email }
      : null;
  if (!where) return null;

  const user = await db.user.findUnique({
    where,
    include: {
      subscriptions: { orderBy: { updatedAt: "desc" }, take: 1 },
    },
  });
  if (!user) return null;

  const sub = user.subscriptions?.[0] ?? null;

  let invoicesCount = 0;
  let lifetimePaid = 0;
  if (user.stripeCustomerId) {
    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
      limit: 100,
    });
    invoicesCount = invoices.data.length;
    lifetimePaid = invoices.data.reduce(
      (sum, i) => sum + (i.amount_paid ?? 0),
      0
    );
  }

  return (
    <section className={styles.grid}>
      <KPI label='Current Plan' value={sub?.planTier ?? "—"} />
      <KPI label='Status' value={sub?.status ?? "—"} />
      <KPI label='Invoices' value={String(invoicesCount)} />
      <KPI
        label='Lifetime Paid'
        value={new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: sub?.currency ?? "USD",
          maximumFractionDigits: 0,
        }).format(lifetimePaid / 100)}
      />
    </section>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
