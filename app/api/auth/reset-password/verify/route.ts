import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();

    const requestToken = cookieStore.get("request_token")?.value;

    const flaskRes = await fetch(
      `${process.env.FLASK_API_URL}/api/auth/reset-password/verify`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requestToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp_code: body.otp,
        }),
      },
    );

    const result = await flaskRes.json();

    if (!flaskRes.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: flaskRes.status },
      );
    }

    cookieStore.delete("request_token");

    cookieStore.set("verify_token", result.data.verify_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Backend connection error" },
      { status: 502 },
    );
  }
}
