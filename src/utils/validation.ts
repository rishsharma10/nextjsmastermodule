import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"; // or your auth strategy
import handler from "@/pages/api/blog";

export const handleError = (msg:string) => {
    return {
        error:{
            message:msg
        }
    }
}
export const verifyToken = (req: NextApiRequest,res:NextApiResponse): any | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Use your secret key
      return decoded;
    } catch {
      return res.status(401).json(handleError("Unauthorized"));
    }
  };

  export const createExpiredToken = (payload = {}) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 0, // expires immediately
    });
  }