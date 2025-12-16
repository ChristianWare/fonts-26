// app/admin/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { auth } from "../../../../../auth";

export const runtime = "nodejs";
export async function POST() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  revalidateTag("admin:metrics");
  revalidateTag("admin:users");
  return NextResponse.json({ ok: true });
}
