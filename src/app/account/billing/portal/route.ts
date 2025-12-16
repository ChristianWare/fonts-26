// app/account/billing/portal/route.ts (update your existing file)
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth"; 
import { db } from "@/lib/db";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.redirect(new URL("/login", req.url));

    const user = await db.user.findUnique({
      where: session.user?.id
        ? { id: session.user.id }
        : { email: session.user.email! },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }

    const form = await req.formData();
    const flow = String(form.get("flow") || "");

    const returnUrl = new URL("/account/settings", req.url).toString();

    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl,
      ...(flow === "payment_method_update"
        ? { flow_data: { type: "payment_method_update" as const } }
        : {}),
    });

    return NextResponse.redirect(portal.url);
  } catch (err) {
    console.error("BILLING_PORTAL_ERROR", err);
    return NextResponse.redirect(
      new URL("/account/settings?portal=error", req.url)
    );
  }
}
