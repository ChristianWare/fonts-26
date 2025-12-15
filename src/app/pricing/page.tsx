import ComparisonChart from "@/components/PricingPage/ComparisonChart/ComparisonChart";
import PricingHero from "@/components/PricingPage/PricingHero/PricingHero";
import ServiceDetails from "@/components/PricingPage/ServiceDetails/ServiceDetails";
import Faq from "@/components/Faq/Faq";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import BlogSection from "@/components/shared/BlogSection/BlogSection";
import Values from "@/components/AboutPage/Values/Values";

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <LayoutWrapper>
        <div style={{ padding: "4rem 0" }}>
          <ServiceDetails />
        </div>
      </LayoutWrapper>
      <ComparisonChart />
      <Faq />
      <Values />
      <BlogSection />
      <FinalCTAMain />
    </main>
  );
}
