import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth: proxy } = NextAuth(authConfig);

const authRoutes = ["/signin", "/signup"];
const protectedRoutes = ["/dashboard"];

export default proxy((req) =>{
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isUserSignedin: boolean = Boolean(req.auth);

    if(authRoutes.includes(path) && isUserSignedin)
        return NextResponse.redirect(new URL("/dashboard", nextUrl));

        if(protectedRoutes.includes(path) && !isUserSignedin)
        return NextResponse.redirect(new URL("/signin", nextUrl));
});



export const config = {
    matcher: ["/signin", "/signup", "/dashboard"]
}