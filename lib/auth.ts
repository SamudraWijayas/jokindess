import jwt from "jsonwebtoken";

const SECRET_KEY = "jfhweifhwuiregfehskbfgdfdsjkvfhd";

interface User {
  _id: string;
  name: string;
  email: string;
}

export function generateToken(user: User) {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, SECRET_KEY);
}
