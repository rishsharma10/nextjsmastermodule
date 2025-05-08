import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { getCollectionCount } from '@/utils/getCollectionCount';
import Order from '@/models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const order = await Order.find();
    const count = await getCollectionCount(Order)
    return res.status(200).json({data:order,count});
  }

  

  res.status(405).end(); // Method Not Allowed
}
