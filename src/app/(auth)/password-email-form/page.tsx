import PasswordEmailForm from "@/components/auth/PasswordEmailForm/PasswordEmailForm";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function PasswordEmailPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <main>
      <Nav />
      <PasswordEmailForm />
      <FinalCTAMain />
    </main>
  );
}
