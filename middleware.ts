import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.url;
  const session = req.cookies.get("next-auth.session-token"); // Check if session exists

  const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // Add all protected routes here

  // Redirect to login if accessing a protected route without a session
  if (protectedRoutes.some((route) => url.includes(route)) && !session) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login page
  }

  // If logged in, redirect to dashboard if trying to access login page
  if (url.includes("/login") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to dashboard
  }

  // Allow the request to continue if none of the conditions matched
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/settings", "/login"], // Add all routes to be matched
};