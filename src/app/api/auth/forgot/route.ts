import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username } = await req.json();
  try {
    const flaskRes = await fetch("http://localhost:5000/api/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(data, { status: flaskRes.status });
    }
    const expire = 300;

    const res = NextResponse.json(data, { status: flaskRes.status });
    res.cookies.set("token_forgot", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
