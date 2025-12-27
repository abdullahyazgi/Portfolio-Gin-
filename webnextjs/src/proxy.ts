import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/signin", "/signup"];

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;

  const isSignedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Redirect signed-in users away from auth pages
  if (authRoutes.includes(path) && isSignedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Protect dashboard (ADMIN only)
  if (path.startsWith("/dashboard")) {
    if (!isSignedIn) {
      return NextResponse.redirect(new URL("/signin", nextUrl));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signin",
    "/signup",
  ],
};
