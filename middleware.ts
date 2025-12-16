/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

export const { auth: withAuth } = NextAuth(authConfig);

export default withAuth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  const isAccount = pathname === "/account" || pathname.startsWith("/account/");
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");
  const isSettings =
    pathname === "/settings" || pathname.startsWith("/settings/");
  const authedOnly = isAccount || isSettings || isAdminArea;

  const authPages = ["/login", "/register", "/password-email"];

  const isLoggedIn = !!req.auth;
  const role = (req.auth as any)?.user?.role ?? (req.auth as any)?.role;

  if (isLoggedIn && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  if (!isLoggedIn && authedOnly) {
    const url = new URL("/login", nextUrl);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminArea && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:css|js(?!on)|mjs|map|jpg|jpeg|png|gif|svg|ico|webp|ttf|woff2?|txt|xml|webmanifest|pdf|zip)).*)",
    "/(api|trpc)(.*)",
  ],
};
