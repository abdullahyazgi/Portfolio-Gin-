import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {db} from "@/utils/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { SigninSchema } from "./utils/validationSchemas";
import * as bcrypt from "bcryptjs";
 
const { handlers, auth, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
    pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      async authorize(data) {
        const validation = SigninSchema.safeParse(data);
        if(validation.success) {
          const { email, password } = validation.data;
          const user = await db.user.findUnique({ where: { email } });
          if(!user || !user.password) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if(isPasswordMatch) return user;
        }
        return null;
      }
    })
  ],
});

export { handlers, auth, signIn };