import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: body.username }),
    });

    const data = await flaskRes.json();

    if (!flaskRes.ok) {
      if (flaskRes.status === 401) {
        return NextResponse.json({
          error: "Username is not found",
          status: 401,
        });
      }
    }

    // token expire
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
