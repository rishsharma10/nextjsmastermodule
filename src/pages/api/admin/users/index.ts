import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import { createJwtToken } from "@/lib/auth";
import { userValidationSchema } from "@/joi/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "GET") {
    const users = await Admin.find();
    return res.status(200).json({ data: users });
  }

  if (req.method === "POST") {
    
    const { email, password } = req.body;

    const users = await Admin.find();

    if (users.length > 0) {
      const existingUser = users[0]; // check only first user as per your logic

      if (existingUser.email === email && existingUser.password === password) {
        const token = createJwtToken(existingUser);
        const user = existingUser.toObject();
        return res
          .status(200)
          .json({ data: { ...user, access_token: token, type: "ADMIN" } });
      } else {
        return res.status(400).json({ error: "Invalid email or password" });
      }
    }

    // No user exists — create a new one
    const newUser = await Admin.create({ email, password });
    const token = createJwtToken(newUser);
    const user = newUser.toObject();

    return res
      .status(201)
      .json({ data: { ...user, access_token: token, type: "ADMIN" } });
  }

  res.status(405).end(); // Method Not Allowed
}
