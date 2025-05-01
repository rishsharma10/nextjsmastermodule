import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwtToken } from '../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJwtToken(token);

  if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });

  // Token is valid, proceed
  res.status(200).json({ message: `Hello user ${payload.userId}` });
}
