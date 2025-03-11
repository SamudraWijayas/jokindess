import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
