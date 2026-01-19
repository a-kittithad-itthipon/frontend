import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout Success" });

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, 
  });

  res.cookies.set("role", "", {
    httpOnly: false, 
    path: "/",
    maxAge: 0,
  });

  return res;
}