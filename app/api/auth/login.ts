import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = generateToken(user);
  return NextResponse.json({
    message: "Login successful",
    token,
    user: { name: user.name, email: user.email },
  });
}
