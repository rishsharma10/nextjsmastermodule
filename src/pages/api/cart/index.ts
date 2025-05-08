import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { getCollectionCount } from '@/utils/getCollectionCount';
import Cart from '@/models/Cart';
import { handleError, verifyToken } from '@/utils/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  if (req.method === 'GET') {
    const cart = await Cart.find(query).populate(populate);
    const count = await getCollectionCount(Cart,query)
    return res.status(200).json({data:cart,count});
  }
  res.status(405).end(); // Method Not Allowed
}
