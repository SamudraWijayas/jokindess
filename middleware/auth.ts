import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const SECRET_KEY = "supersecret";

export const authMiddleware =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = parse(req.headers.cookie || "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
