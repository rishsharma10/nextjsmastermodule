import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { getCollectionCount } from "@/utils/getCollectionCount";
import Rating from "@/models/Rating";
import { handleError, verifyToken } from "@/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  const user = verifyToken(req, res);
  if (!user) {
    return res.status(401).json(handleError("Unauthorized"));
  }
  let populate = [
    { path: "user_id", select: "_id name email" },
    { path: "product_id", select: "name price description category images" },
  ];
  let query = { user_id: user?.userId?._id };
  if (req.method === "GET") {
    const rating = await Rating.find(query).populate(populate);
    const count = await getCollectionCount(Rating, query);
    return res.status(200).json({ data: rating, count });
  }
  res.status(405).end(); // Method Not Allowed
}
