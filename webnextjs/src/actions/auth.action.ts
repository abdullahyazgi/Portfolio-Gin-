"use server"
import { SigninSchema, SignupSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";


type signinDto = z.infer<typeof SigninSchema>;
type signupDto = z.infer<typeof SignupSchema>;

// Signin Action
export const signinAction = async (data: signinDto) => {
  const validation = SigninSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };

  const { email, password } = validation.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Failed to sign in" };
      }
    }
    throw error;
  }

  return { success: true, message: "Signed in successfully" }
}

// Signup Action
export const signupAction = async (data: signupDto) => {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };

  const { name, email, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return { success: false, message: "User already exist" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }


}

// Signout
export const signoutAction = async () => {
  await signOut();
}