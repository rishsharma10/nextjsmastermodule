import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { handleByIdMethods } from "@/lib/apiHandlers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  await handleByIdMethods(req, res, Blog);
}
