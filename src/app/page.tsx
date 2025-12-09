import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";
import styles from "./page.module.css";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutUs from "@/components/HomePage/AboutUs/AboutUs";
import ProblemSection from "@/components/HomePage/ProblemSection/ProblemSection";
import ValueProp from "@/components/HomePage/ValueProp/ValueProp";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import WhoIsThisFor from "@/components/HomePage/WhoIsThisFor/WhoIsThisFor";

export default function HomePage() {
  return (
    <main>
      <div className={styles.scrollContainer}>
        <Hero />
        <FontsandFooters />
        <AboutUs />
        <ProblemSection />
        <ValueProp />
        <HowItWorks />
        <WhoIsThisFor />
      </div>
    </main>
  );
}
