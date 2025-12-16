import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import RegisterPageIntro from "@/components/registerPage/RegisterPageIntro";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
// import { db } from "@/lib/db";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/account");
  return (
    <main>
      <Nav />
      <RegisterPageIntro />
      <FinalCTAMain />
    </main>
  );
}
