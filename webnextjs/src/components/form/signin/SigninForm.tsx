"use client";
import { useState } from "react";
import { SigninSchema } from "@/lib/validationSchemas";
import Alert from "@mui/material/Alert";
import { signinAction } from "@/actions/auth.action";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = SigninSchema.safeParse({email, password});
    if(!validation.success)
      return setClientError(validation.error.issues[0].message);

    signinAction({email, password}).then((result) => {
      if(result?.error) setServerError(result.error);
      if(result?.success) setServerSuccess(result.success);
    });

    setEmail("");
    setPassword("");
    setClientError("");
  }

  return (
    <form onSubmit={formSubmitHandler}>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="border" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        {(clientError || serverError) && <Alert severity="error">{clientError || serverError}</Alert>}
        {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}
        <button type="submit">Sign in</button>
    </form>
  )
}
