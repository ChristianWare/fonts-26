import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import DashboardPageIntro from "@/components/dashboard/DashboardPageIntro/DashboardPageIntro";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <main>
      <Nav />
      <DashboardPageIntro />
      <FinalCTAMain />
    </main>
  );
}
