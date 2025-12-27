import type { NextAuthConfig } from "next-auth"
import { SigninSchema } from "./lib/validationSchemas";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";


export default {
  providers: [
    Credentials({
      async authorize(data) {
        const validation = SigninSchema.safeParse(data);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({ where: { email: email } });
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            return user;
          }
        }
        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      if (session.user && typeof token.role === "string") session.user.role = token.role;

      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin",
  },

} satisfies NextAuthConfig