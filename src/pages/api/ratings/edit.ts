import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Rating from "@/models/Rating";
import { handleError, verifyToken } from "@/utils/validation";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method !== "PUT") {
    return res.status(405).end(); // Method Not Allowed
  }
  const users = verifyToken(req, res);
  const data = { ...users.userId };
  const { _id,product_id, rating, review } = req.body;
  if (!data) {
    return res.status(401).json(handleError("Unauthorized"));
  }
  if (!isValidObjectId(product_id)) {
    return res.status(400).json(handleError("Invalid product"));
  }
  const apiRes = await Rating.findByIdAndUpdate(
    _id,
    {product_id, rating, review },
    { new: true } // Return the updated document
  );
  return res.status(200).json({ data: apiRes });
}
