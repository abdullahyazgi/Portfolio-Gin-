"use server";
import { SigninSchema, SignupSchema } from "@/utils/validationSchemas";
import { z } from "zod";
import  {db}  from "@/utils/db";
import * as bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type SigninDto = z.infer<typeof SigninSchema>;

export const signinAction = async (data: SigninDto) => {
  const validation = SigninSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };
  
  const { email, password } = validation.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" });
  } catch (error) {
    if(error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }

  return { success: true, message: "Signed in successfully" }
}

// signupAction
export const signupAction = async (data: z.infer<typeof SignupSchema>) => {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };

  const { name, password, email } = validation.data;
  const user = await db.user.findUnique({ where: { email } });
  if (user) return { success: false, message: "user already exist" };


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.user.create({
    data: { email, name, password: hashedPassword }
  });

  console.log(data);
  return { success: true, message: "Signed up successfully" }


};