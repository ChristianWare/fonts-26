import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";
import styles from "./page.module.css";
import Hero from "@/components/HomePage/Hero/Hero";

export default function HomePage() {
  return (
    <main>
      <div className={styles.scrollContainer}>
        <Hero />
        <FontsandFooters />
      </div>
    </main>
  );
}
