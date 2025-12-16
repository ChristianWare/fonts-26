// app/(auth)/email-verification/page.tsx
import EmailVerificationClient from "@/components/auth/EmailVerificationClient/EmailVerificationClient";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import Nav from "@/components/shared/Nav/Nav";

export default async function EmailVerificationPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const token = typeof sp.token === "string" ? sp.token : undefined;

  return (
    <main>
      <Nav />
      <EmailVerificationClient token={token} />
      <FinalCTAMain />
    </main>
  );
}
