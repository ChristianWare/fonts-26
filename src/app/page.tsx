import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";
import styles from "./page.module.css";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutUs from "@/components/HomePage/AboutUs/AboutUs";

export default function HomePage() {
  return (
    <main>
      <div className={styles.scrollContainer}>
        <Hero />
        <FontsandFooters />
        <AboutUs />
      </div>
    </main>
  );
}
