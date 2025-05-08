import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Cart from "@/models/Cart";
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
  
  const userId = user?.userId?._id || user?._id;
  
  if (!userId || !isValidObjectId(userId)) {
    return res.status(400).json(handleError("Invalid or missing user ID"));
  }
  
  const { product_id, quantity } = req.body;
  
  if (!isValidObjectId(product_id)) {
    return res.status(400).json(handleError("Invalid product ID format"));
  }
  
  const query = { user_id: userId, product_id };
  const cartData = await Cart.find(query);
  if (cartData?.length) {
    return res.status(400).json(handleError("Item already in cart"));
  }
  
  try {
    const cartItem = await Cart.create({
      user_id: userId,
      product_id,
      quantity,
    });
    return res.status(201).json({ data: cartItem });
  } catch (err: any) {
    return res.status(500).json(handleError(err.message));
  }
}
