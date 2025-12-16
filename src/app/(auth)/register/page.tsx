import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import RegisterPageIntro from "@/components/registerPage/RegisterPageIntro";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import ScrollVelocity from "@/components/shared/ScrollVelocity/ScrollVelocity";
// import { db } from "@/lib/db";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/account");
  return (
    <main>
      <Nav />
      <RegisterPageIntro />
      <ScrollVelocity
        texts={["Register •", "Register •"]}
        className='Register •'
      />
      <br />
      <br />
      <br />
      <br />
      <FinalCTAMain />
    </main>
  );
}
