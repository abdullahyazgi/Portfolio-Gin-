"use client";
import { signupAction } from "@/actions/auth.action";
import { SignupSchema } from "@/lib/validationSchemas";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, email, password };
    const validation = SignupSchema.safeParse(user);
    if (!validation.success)
      return setClientError(validation.error.issues[0].message);

    signupAction(user).then((result) => {
      if(result.success) {
        setClientError("");
        setServerError("");
        setName("");
        setEmail("");
        setPassword("");
        setServerSuccess(result.message);
      }
      if(!result.success) setServerError(result.message); 
    });
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="border" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="border" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="border" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {(clientError || serverError) && <Alert severity="error">{clientError || serverError}</Alert>}
      {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}
      <button type="submit">Sign up</button>
    </form>
  )
}
