import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const role = cookieStore.get("role");
  const path = req.nextUrl.pathname;
  const token_forgot = cookieStore.get("token_forgot");

  if (!token && !token_forgot) {
    if (!token && !token_forgot && path.startsWith("/forgot_repassword")) {
      return NextResponse.redirect(new URL("/forgot", req.url));
    }

    if (
      !token &&
      path != "/login" &&
      path != "/forgot" &&
      path != "/register"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token_forgot) {
    if (path === "/forgot_repassword") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/forgot_repassword", req.url));
  }

  if (token && !token_forgot) {
    if (
      path.startsWith("/dashboard") ||
      path.startsWith("/upload") ||
      path.startsWith("/user_manage") ||
      path.startsWith("/me") ||
      path.startsWith("/hisory")
    ) {
      if (role?.value == "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    if (token && (path.startsWith("/login") || path.startsWith("/forgot"))) {
      if (role?.value == "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/users/dashboard", req.url));
      }
    }
    if (token && path.startsWith("/users/")) {
      if (role?.value == "user") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/",
    "/user_manage/",
    "/upload/",
    "/me",
    "/history",
    "/users/:path*",
    "/login",
    "/forgot",
    "/forgot_repassword",
  ],
};
