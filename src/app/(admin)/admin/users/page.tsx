// app/admin/users/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { UsersTable } from "@/components/admin/UsersTable/UsersTable";

export const runtime = "nodejs";

export default async function UsersIndex({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  // conform to your project's PageProps shape
  await searchParams;

  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <main>
      <UsersTable />
    </main>
  );
}
