// app/account/plan/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import BillingZone from "@/components/account/BillingZone/BillingZone";
import styles from "./PlanPage.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function PlanPage() {
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
      subscriptions: { orderBy: { updatedAt: "desc" }, take: 1 },
    },
  });
  if (!user) redirect("/login");

  const sub = user.subscriptions?.[0] ?? null;

  return (
  
      <section className={styles.container}>
        <BillingZone
          currentPlan={(sub?.planTier as any) ?? null}
          hasActiveSub={!!sub}
        />
      </section>
    
  );
}
