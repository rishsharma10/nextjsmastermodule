import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { getCollectionCount } from '@/utils/getCollectionCount';
import Product from '@/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const blog = await Product.find();
    const count = await getCollectionCount(Product)
    return res.status(200).json({data:blog,count});
  }

  if (req.method === 'POST') {
    const blog = await Product.create(req.body);
    const data = blog.toObject()
    return res.status(201).json({data});
  }

  res.status(405).end(); // Method Not Allowed
}
