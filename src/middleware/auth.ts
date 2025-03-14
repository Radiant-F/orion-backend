import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const requireAuth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No token provided." });
      return;
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "some-secret-key";
    const decoded = jwt.verify(token, secret) as ITokenPayload;
    req.body.userId = decoded.userId; // store userId
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
    return;
  }
};
