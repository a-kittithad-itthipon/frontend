import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("sidebar_state");

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
