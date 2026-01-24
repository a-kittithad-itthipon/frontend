import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout Success" });

  res.cookies.set("session_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
