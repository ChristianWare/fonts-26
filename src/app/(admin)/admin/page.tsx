// app/admin/page.tsx
import styles from "./AdminPage.module.css";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { Suspense } from "react";
import Link from "next/link"; // ← add
import { KPIGrid } from "@/components/admin/KPIGrid/KPIGrid";
import { UsersTable } from "@/components/admin/UsersTable/UsersTable";
import RefreshButton from "@/components/admin/RefreshButton/RefreshButton";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h1 className={styles.heading}>Admin Dashboard</h1>

          <div className={styles.actions}>
            <Link
              href='/admin/billing/subscriptions'
              className={styles.linkBtn}
            >
              Billing & Subscriptions →
            </Link>
            <Link href='/admin/billing/webhooks' className={styles.linkBtn}>
              Webhook Events →
            </Link>
            <RefreshButton />
          </div>
        </div>

        <Suspense fallback={<div>Loading metrics…</div>}>
          <KPIGrid />
        </Suspense>

        <section className={styles.section}>
          <Suspense fallback={<div>Loading users…</div>}>
            <UsersTable />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
