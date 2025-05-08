import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { getCollectionCount } from '@/utils/getCollectionCount';
import Order from '@/models/Order';
import mongoose from "mongoose"
import { handleError } from '@/utils/validation';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
if (!isValidObjectId(String(req.query.id))) {
    return res.status(400).json({ error: handleError("Invalid ID format") });
  }
  if (req.method === 'GET') {
    const order = await Order.findById(req.query.id);
    return res.status(200).json({data:order});
  }
  res.status(405).end(); // Method Not Allowed
}
