"use client";
import { useState } from "react";
import { SigninSchema } from "@/utils/validationSchemas";
import { signinAction } from "@/actions/auth.action";
import Alert from "@mui/material/Alert";

const SigninForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = SigninSchema.safeParse({ email, password });
        if (!validation.success)
            return setClientError(validation.error.issues[0].message)

        signinAction({ email, password }).then((result) => {
           if(!result.success) setServerError(result.message);
        });
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3">
                <label htmlFor="email">Email</label>
                <input className="border border-amber-400" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input className="border border-amber-400" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {(clientError || serverError) && <Alert severity="error">{clientError || serverError}</Alert>}
            
            <button type="submit">Sign in</button>
        </form>
    )
}

export default SigninForm