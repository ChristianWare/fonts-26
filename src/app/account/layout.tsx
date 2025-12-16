// app/account/layout.tsx
import styles from "./AccountLayout.module.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import AccountNav from "@/components/account/AccountNav/AccountNav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export const runtime = "nodejs";
export const metadata = { title: "Account — Fonts & Footers" };

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className={styles.container}>
      <Nav />
      <LayoutWrapper>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <AccountNav />
          </aside>
          <div className={styles.content}>{children}</div>
        </div>
      </LayoutWrapper>
      <FinalCTAMain />
    </main>
  );
}
