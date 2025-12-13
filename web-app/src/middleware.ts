import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/signin", "/signup"];
const protectedRoutes =["/admin"];

export default middleware((req) => {
    const {nextUrl} = req;
    const path = nextUrl.pathname;
    const isUserSignedin: boolean = Boolean(req.auth);

    if(authRoutes.includes(path) && isUserSignedin)
        return NextResponse.redirect(new URL("/admin", nextUrl));

    if(protectedRoutes.includes(path) && !isUserSignedin)
        return NextResponse.redirect(new URL("/signin", nextUrl));
});

export const config = {
    matcher: ["/signin", "/signup", "/admin"]
}