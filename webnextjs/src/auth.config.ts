import type { NextAuthConfig } from "next-auth"
import { prisma } from "./lib/prisma";
import { SigninSchema } from "./lib/validationSchemas";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";


export default {
  providers: [
    Credentials({
      async authorize(data) {
        const validation = SigninSchema.safeParse(data);
        if(validation.success) {
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
} satisfies NextAuthConfig