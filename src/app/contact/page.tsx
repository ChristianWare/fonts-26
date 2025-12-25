import ContactHero from "@/components/ContactPage/ContactHero";
import ContactPageContainer from "@/components/ContactPage/ContactPageContainer/ContactPageContainer";
import BlogSection from "@/components/shared/BlogSection/BlogSection";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import ScrollVelocity from "@/components/shared/ScrollVelocity/ScrollVelocity";

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactPageContainer />
      <ScrollVelocity
        texts={["Fonts & Footers •", "Fonts & Footers •"]}
        className='Fonts & Footers •'
      />
      <BlogSection />
      <FinalCTAMain />
    </div>
  );
}
