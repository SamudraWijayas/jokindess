import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout berhasil" },
    { status: 200 }
  );

  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
  );

  return response;
}
