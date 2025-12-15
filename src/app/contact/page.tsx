import ContactHero from "@/components/ContactPage/ContactHero";
import ContactPageContainer from "@/components/ContactPage/ContactPageContainer/ContactPageContainer";
import BlogSection from "@/components/shared/BlogSection/BlogSection";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactPageContainer />
      <BlogSection />
      <FinalCTAMain />
    </div>
  );
}
