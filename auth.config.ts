/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.config.ts
import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [], // required by the type
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? "USER";
        token.emailVerified = (user as any).emailVerified ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any) = {
          ...session.user,
          id: token.id as string,
          role: (token.role as string) ?? "USER",
          emailVerified: token.emailVerified ?? null,
        };
      }
      return session;
    },
    // optional signIn gate for unverified credentials users:
    // async signIn({ user, account }) {
    //   if (account?.provider === "credentials") {
    //     if (!(user as any)?.emailVerified) return "/email-verification?notice=verify";
    //   }
    //   return true;
    // },
  },
} satisfies NextAuthConfig;

export default authConfig;
