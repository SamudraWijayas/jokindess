import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Jika user belum login, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Middleware hanya berjalan di halaman `/dashboard`
export const config = {
  matcher: "/dashboard/:path*",
};
