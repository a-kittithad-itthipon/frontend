import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();

    let response: Response;

    try {
      response = await fetch(
        `${process.env.FLASK_API_URL}/api/auth/reset-password/confirm`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookieStore.get("verify_token")?.value}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: body.cPassword }),
        },
      );
    } catch {
      return NextResponse.json(
        { message: "Service unavailable" },
        { status: 503 },
      );
    }

    const result = await response.json();

    if (!response.ok)
      return NextResponse.json(
        { message: result.message },
        { status: response.status },
      );

    return NextResponse.json(
      { message: result.message },
      { status: response.status },
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
