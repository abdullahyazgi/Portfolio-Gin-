import { SigninForm } from "@/components/form/signin/SigninForm";
import Link from "next/link";

const SignIn = () => {
  return (
    <section>
        <div>
            <h1>
                Sign in to your account
            </h1>
            <SigninForm />
            <p>
                Do not have an account?
            </p>
            <Link href="/signup">Sign up</Link>
        </div>
    </section>
  )
}

export default SignIn;