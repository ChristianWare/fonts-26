import Faq from "@/components/Faq/Faq";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import AllProjects from "@/components/WorkPage/AllProjects/AllProjects";
import WorkHero from "@/components/WorkPage/WorkHero/WorkHero";

export const metadata = {
  title: "Work",
  description:
    "Explore our portfolio of projects showcasing our expertise in web development, design, and digital solutions. See how we've helped clients achieve their goals with innovative and effective strategies.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <AllProjects />
      <Faq />
      <FinalCTAMain />
    </main>
  );
}
