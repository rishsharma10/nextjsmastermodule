import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Users from "@/models/User";
import { createJwtToken } from "@/lib/auth";
import { userValidationSchema } from "@/joi/user";
import { handleError } from "@/utils/validation";
import { emailServices } from "@/services/emailServices";
import { METHOD_POST, WEBSITE_NAME } from "@/actions/actionTypes";
import { welcomeTemplate } from "@/templates/welcome";
import { urlemail } from "@/urls/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "GET") {
    const users = await Users.find();
    return res.status(200).json({ data: users });
  }

  if (req.method === "POST") {
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(handleError(error.details[0].message));
    }
    const { email, password } = req.body;
    const users = await Users.find();
    if (users.length > 0) {
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res.status(400).json(handleError("Email already exists"));
      }
    }
    const newUser = await Users.create({ email, password });
    const token = await createJwtToken(newUser);
    const user = await newUser.toObject();
    return res
      .status(201)
      .json({ data: { ...user, access_token: token, type: "USER" } });
  }

  res.status(405).end(); // Method Not Allowed
}
