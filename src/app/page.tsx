import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";
import styles from "./page.module.css";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutUs from "@/components/HomePage/AboutUs/AboutUs";
import ValueProp from "@/components/HomePage/ValueProp/ValueProp";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import ScrollVelocity from "@/components/shared/ScrollVelocity/ScrollVelocity";
import ParallaxArea from "@/components/HomePage/ParallaxArea/ParallaxArea";
import CaseStudies from "@/components/HomePage/CaseStudies/CaseStudies";
import ProblemSectionii from "@/components/HomePage/ProblemSectionii/ProblemSectionii";
import Benefits from "@/components/shared/Benefits/Benefits";
import PricingPreview from "@/components/HomePage/PricingPreview/PricingPreview";
import Faq from "@/components/Faq/Faq";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import Values from "@/components/AboutPage/Values/Values";
import BlogSection from "@/components/shared/BlogSection/BlogSection";

export default function HomePage() {
  return (
    <main>
      <div className={styles.scrollContainer}>
        <Hero />
        <FontsandFooters text1='Fonts' text2='&' text3='Footers' />
        <AboutUs />
        <ProblemSectionii />
        <ValueProp />
        <ScrollVelocity
          texts={["End to end support •", "End to end support •"]}
          className='End to end support •'
        />
        <HowItWorks />
        <ParallaxArea />
        <CaseStudies />
        <Benefits />
        <PricingPreview />
        <FontsandFooters text1='Frequently' text2='Asked' text3='Questions' />
        <Faq />
        <Values />
        <BlogSection />
        <FinalCTAMain />
      </div>
    </main>
  );
}
