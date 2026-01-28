import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  try {
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong. Try again later" },
      { status: 500 },
    );
  }
}
