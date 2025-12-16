// app/account/settings/page.tsx
import styles from "./SettingsPage.module.css";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import SettingsForms from "@/components/account/SettingsForms/SettingsForms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.sub}>Manage your profile and security.</p>
      </header>
<br />
<br />
      <SettingsForms />
    </div>
  );
}
