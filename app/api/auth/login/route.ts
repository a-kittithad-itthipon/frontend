import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await flaskRes.json();

  if (!flaskRes.ok) {
    return NextResponse.json(data, {
      status: flaskRes.status,
    });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("session_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
