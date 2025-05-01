import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { createJwtToken } from "@/lib/auth";
import { userValidationSchema } from "@/joi/user";
import { handleError } from "@/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json(handleError(`Email does not exist`));
      }
  
      if (existingUser.password !== password) {
        return res.status(401).json(handleError(`Invalid email or password`));
      }
      const token = createJwtToken(existingUser);
      const user = existingUser.toObject();
      return res.status(200).json({
        data: {
          ...user,
          access_token: token,
          type: "USER",
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.status(405).end(); // Method Not Allowed
}
