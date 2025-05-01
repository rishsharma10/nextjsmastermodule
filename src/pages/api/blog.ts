import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { getCollectionCount } from "@/utils/getCollectionCount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  const blog = await Blog.find();
  const count = await getCollectionCount(Blog);
  return res.status(200).json({ data: blog, count });
}
