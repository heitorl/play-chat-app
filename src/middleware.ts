import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const signinUrl = new URL("/signin", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  const publicRoutes = ["/", "/signin", "/signup"];

  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(dashboardUrl);
  }

  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/", "/signin", "/signup"],
};
