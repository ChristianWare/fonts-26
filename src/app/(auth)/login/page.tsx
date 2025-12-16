import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import LoginPageIntro from "@/components/loginPage/LoginPageIntro/LoginPageIntro";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import ScrollVelocity from "@/components/shared/ScrollVelocity/ScrollVelocity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/account");
  return (
    <main>
      <Nav />
      <LoginPageIntro />
      <ScrollVelocity texts={["Login •", "Login •"]} className='Login •' />
      <br />
      <br />
      <br />
      <br />
      <FinalCTAMain />
    </main>
  );
}
