import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { handleByIdMethods } from '@/lib/apiHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  // await handleByIdMethods(req, res, User);
  return handleByIdMethods(req, res, User, {
    requireAuth: false,
    authorize: (user) => user?.type === "USER",
  });
}
