import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Rating from "@/models/Rating";
import { handleError } from "@/utils/validation";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

const verifyToken = (req: NextApiRequest): any | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json(handleError("Unauthorized"));
  }
  console.log(user, "user______");
  const userId = user.userId?._id || user._id;
  const { product_id, rating, review, type = "add" } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(product_id)) {
    return res.status(400).json(handleError("Invalid ID format"));
  }

  try {
    const cartItem = await Rating.create({
      user_id: userId,
      product_id,
      rating,
      review,
    });
    return res.status(201).json({ data: cartItem });
  } catch (err: any) {
    return res.status(500).json(handleError(err.message));
  }
}
