// auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import authConfig from "./auth.config"; // <- the lean config
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema } from "@/schemas/LoginSchema";
import bcryptjs from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "USER" | "ADMIN";
      userId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface JWT {
    role?: "USER" | "ADMIN";
    userId?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Spread the light options first
  ...authConfig,

  // Heavy stuff stays here (Node runtime)
  adapter: PrismaAdapter(db),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      // Optional: define credentials fields for type safety/UI
      // credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const isCorrectPassword = await bcryptjs.compare(
          password,
          user.password
        );
        return isCorrectPassword ? user : null;
      },
    }),
  ],

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    // This one CAN query the DB because it's in Node runtime (not middleware)
    async jwt({ token }) {
      if (!token.email) return token;

      const user = await getUserByEmail(token.email);
      if (!user) return token;

      token.role = user.role as "USER" | "ADMIN";
      token.userId = user.id;
      return token;
    },

    async session({ session, token }) {
      if (token.role) session.user.role = token.role as "USER" | "ADMIN";
      if (token.userId) session.user.userId = token.userId as string; // <-- fixed typo (was userID)
      return session;
    },
  },

  pages: { signIn: "/login" },
});
