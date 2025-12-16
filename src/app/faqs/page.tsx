import ContactPageContainer from "@/components/ContactPage/ContactPageContainer/ContactPageContainer";
import Faq from "@/components/Faq/Faq";
import FAQPageIntro from "@/components/FAQPage/FAQPageIntro/FAQPageIntro";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import Nav from "@/components/shared/Nav/Nav";

export default function FAQPage() {
  return (
    <main>
      <Nav />
      <FAQPageIntro />
      <Faq />
      <ContactPageContainer />
      <FinalCTAMain />
    </main>
  );
}
