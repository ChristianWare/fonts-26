import AboutDetailsIntro from "@/components/AboutPage/AboutDetailsIntro/AboutDetailsIntro";
import AboutHero from "@/components/AboutPage/AboutHero/AboutHero";
import BrandStory from "@/components/AboutPage/BrandStory/BrandStory";
import Chris from "@/components/AboutPage/Chris/Chris";
import Fit from "@/components/AboutPage/Fit/Fit";
import Values from "@/components/AboutPage/Values/Values";
import WhyWeExist from "@/components/AboutPage/WhyWeExist/WhyWeExist";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutDetailsIntro />
      <WhyWeExist />
      <BrandStory />
      <Chris />
      <Fit />
      <Values />
      <FinalCTAMain />
    </main>
  );
}
