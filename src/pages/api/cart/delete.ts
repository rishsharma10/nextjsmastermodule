import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import Cart from "@/models/Cart";
import { handleError, verifyToken } from "@/utils/validation";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method !== "DELETE") {
    return res.status(405).end(); // Method Not Allowed
  }
  const users = verifyToken(req, res);
  const data = { ...users.userId };
  const { _id } = req.body;
  if (!data) {
    return res.status(401).json(handleError("Unauthorized"));
  }
  if (!isValidObjectId(_id)) {
    return res.status(400).json(handleError("Invalid Id"));
  }
  const apiRes = await Cart.findByIdAndDelete(
    _id,
     // Return the updated document
  );
  return res.status(200).json({ message:"Deleted successfully" });
}
