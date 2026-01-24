import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const flaskRes = await fetch(
      `${process.env.FLASK_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      },
    );

    const res = await flaskRes.json();

    if (!flaskRes.ok) {
      return NextResponse.json(res, { status: flaskRes.status });
    }

    const cookieStore = await cookies();
    cookieStore.set("session_token", res.data?.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
