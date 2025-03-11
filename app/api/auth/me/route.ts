import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ error: "Tidak ada token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, "SECRET_KEY") as { name: string };

    return NextResponse.json({ name: decoded.name });
  } catch (error) {
    return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
  }
}
