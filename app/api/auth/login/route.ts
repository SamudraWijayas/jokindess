import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    // Atur cookie dengan HttpOnly
    const response = NextResponse.json(
      { message: "Login berhasil", user: { name: user.name } },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
