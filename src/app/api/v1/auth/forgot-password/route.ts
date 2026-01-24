import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const flaskRes = await fetch(
      `${process.env.FLASK_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: body.username }),
      },
    );

    const res = await flaskRes.json();

    if (!flaskRes.ok) {
      return NextResponse.json(res, { status: flaskRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
