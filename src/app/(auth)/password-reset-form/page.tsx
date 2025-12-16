// app/(auth)/password-reset-form/page.tsx
import PasswordResetFormClient from "@/components/auth/PasswordResetFormClient/PasswordResetFormClient";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import Nav from "@/components/shared/Nav/Nav";

export default async function PasswordResetFormPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const token = typeof sp.token === "string" ? sp.token : undefined;

  return (
    <main>
      <Nav />
      <PasswordResetFormClient token={token} />
      <FinalCTAMain />
    </main>
  );
}
