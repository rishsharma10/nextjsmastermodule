import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import Blog from '@/models/Blog';
import { getCollectionCount } from '@/utils/getCollectionCount';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const blog = await Blog.find();
    const count = await getCollectionCount(Blog)
    return res.status(200).json({data:blog,count});
  }

  if (req.method === 'POST') {
    const blog = await Blog.create(req.body);
    const data = blog.toObject()
    return res.status(201).json({data});
  }

  res.status(405).end(); // Method Not Allowed
}
