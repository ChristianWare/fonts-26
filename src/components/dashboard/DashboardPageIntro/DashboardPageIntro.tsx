import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { auth } from "../../../../auth";
import UserButton from "../UserButton/UserButton";
import styles from "./DashboardPageIntro.module.css";

export default async function DashboardPageIntro() {
  const session = await auth();

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <h1 className={styles.heading}>{session?.user?.name}&#39;s Dashboard</h1>
        <UserButton />
      </LayoutWrapper>
    </section>
  );
}
