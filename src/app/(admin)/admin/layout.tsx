// app/admin/layout.tsx
import styles from "./AdminLayout.module.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import AdminNav from "@/components/admin/AdminNav/AdminNav";

export const runtime = "nodejs";

export const metadata = {
  title: "Admin — Fonts & Footers",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main className={styles.container}>
      <Nav />
      <LayoutWrapper>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <AdminNav />
          </aside>
          <div className={styles.content}>{children}</div>
        </div>
      </LayoutWrapper>
      <FinalCTAMain />
    </main>
  );
}
  