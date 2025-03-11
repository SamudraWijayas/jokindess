import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export function generateToken(user: any) {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
