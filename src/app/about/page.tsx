import AboutHero from "@/components/AboutPage/AboutHero/AboutHero";
import Approach from "@/components/AboutPage/Approach/Approach";
import Believe from "@/components/AboutPage/Believe/Believe";
import BrandStory from "@/components/AboutPage/BrandStory/BrandStory";
import Chris from "@/components/AboutPage/Chris/Chris";
import Fit from "@/components/AboutPage/Fit/Fit";
import HowWeWork from "@/components/AboutPage/HowWeWork/HowWeWork";
import Values from "@/components/AboutPage/Values/Values";
import WhyWeExist from "@/components/AboutPage/WhyWeExist/WhyWeExist";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Approach />
      <Believe />
      <BrandStory />
      <Chris />
      <Fit />
      <HowWeWork />
      <Values />
      <WhyWeExist />
      <FinalCTAMain />
    </main>
  );
}
