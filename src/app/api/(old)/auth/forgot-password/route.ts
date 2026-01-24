import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: body.username }),
  });

  const data = await flaskRes.json();

  if (!flaskRes.ok) {
    return NextResponse.json(data, {
      status: flaskRes.status,
    });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("password_reset_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 300, // 5 minutes
  });

  return response;
}
