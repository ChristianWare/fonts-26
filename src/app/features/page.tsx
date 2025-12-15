import Values from "@/components/AboutPage/Values/Values";
import Faq from "@/components/Faq/Faq";
import FeaturesHero from "@/components/FeaturesPage/FeaturesHero/FeaturesHero";
import ServiceDetails from "@/components/FeaturesPage/ServiceDetails/ServiceDetails";
import ValueProp from "@/components/HomePage/ValueProp/ValueProp";
import BlogSection from "@/components/shared/BlogSection/BlogSection";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import FontsandFooters from "@/components/shared/FontsandFooters/FontsandFooters";

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <ServiceDetails />
      <ValueProp />
      <FontsandFooters text1='Frequently' text2='Asked' text3='Questions' />
      <Faq />
      <Values />
      <BlogSection />
      <FinalCTAMain />
    </main>
  );
}
