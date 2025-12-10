import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";
import styles from "./page.module.css";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutUs from "@/components/HomePage/AboutUs/AboutUs";
// import ProblemSection from "@/components/HomePage/ProblemSection/ProblemSection";
import ValueProp from "@/components/HomePage/ValueProp/ValueProp";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import WhoIsThisFor from "@/components/HomePage/WhoIsThisFor/WhoIsThisFor";
import ScrollVelocity from "@/components/shared/ScrollVelocity/ScrollVelocity";
import ParallaxArea from "@/components/HomePage/ParallaxArea/ParallaxArea";
import CaseStudies from "@/components/HomePage/CaseStudies/CaseStudies";
import ProblemSectionii from "@/components/HomePage/ProblemSectionii/ProblemSectionii";

export default function HomePage() {
  return (
    <main>
      <div className={styles.scrollContainer}>
        <Hero />
        <FontsandFooters />
        <AboutUs />
        {/* <ProblemSection /> */}
        <ProblemSectionii />
        <ValueProp />
        <ScrollVelocity
          texts={["End to end support •", "End to end support •"]}
          className='End to end support •'
        />
        <HowItWorks />
        <ParallaxArea />
        <CaseStudies />
        <WhoIsThisFor />
      </div>
    </main>
  );
}
