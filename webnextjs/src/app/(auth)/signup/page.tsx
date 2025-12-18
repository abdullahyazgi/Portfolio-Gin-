import { SignupForm } from "@/components/form/signup/SignupForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <section>
        <div>
            <h1>
                Create new account
            </h1>
            <SignupForm />
            <p>
                Already have an account?
            </p>
            <Link href="/signin">Sign in</Link>
        </div>
    </section>
  )
}

export default SignUp;