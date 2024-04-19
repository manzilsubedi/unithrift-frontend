import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  if (!getCookie("userId")) {
    // If the user is logged in, allow access to the "/site" route
    return NextResponse.next();
  } else {
    // If the user is not logged in, redirect to the "/auth" route
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  // Apply the middleware to all routes under "/site"
  matcher: ["/site/:path*"],
};
