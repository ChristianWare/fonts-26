// app/account/settings/actions/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.redirect(new URL("/login", req.url));

  const where = session.user?.id
    ? { id: session.user.id }
    : session.user?.email
      ? { email: session.user.email }
      : null;
  if (!where) return NextResponse.redirect(new URL("/login", req.url));

  const form = await req.formData();
  const action = String(form.get("action") || "");

  try {
    switch (action) {
      case "update_name": {
        const name = String(form.get("name") || "").trim();
        await db.user.update({ where, data: { name } });
        revalidatePath("/account");
        revalidatePath("/account/settings");
        return NextResponse.redirect(
          new URL("/account/settings?ok=name", req.url)
        );
      }

      case "update_email": {
        const email = String(form.get("email") || "")
          .trim()
          .toLowerCase();
        // Optional: send verification email flow here
        await db.user.update({ where, data: { email } });
        revalidatePath("/account");
        revalidatePath("/account/settings");
        return NextResponse.redirect(
          new URL("/account/settings?ok=email", req.url)
        );
      }

      case "change_password": {
        const current = String(form.get("current") || "");
        const next = String(form.get("next") || "");
        const confirm = String(form.get("confirm") || "");

        if (!next || next !== confirm) {
          return NextResponse.redirect(
            new URL("/account/settings?err=pass_mismatch", req.url)
          );
        }

        const user = await db.user.findUnique({ where });
        if (!user) {
          return NextResponse.redirect(new URL("/login", req.url));
        }

        // If user had no password (OAuth-only), skip current check
        if (user.password) {
          const ok = await bcrypt.compare(current, user.password);
          if (!ok) {
            return NextResponse.redirect(
              new URL("/account/settings?err=bad_current", req.url)
            );
          }
        }

        const hash = await bcrypt.hash(next, 10);
        await db.user.update({ where, data: { password: hash } });

        revalidatePath("/account");
        revalidatePath("/account/settings");
        return NextResponse.redirect(
          new URL("/account/settings?ok=password", req.url)
        );
      }

      default:
        return new NextResponse("Unknown action", { status: 400 });
    }
  } catch (err) {
    console.error("SETTINGS_ACTION_ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
