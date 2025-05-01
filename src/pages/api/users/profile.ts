import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import {
  createExpiredToken,
  handleError,
  verifyToken,
} from "@/utils/validation";
import User from "@/models/User";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "GET") {
    const users = verifyToken(req, res);
    const data = { ...users.userId };
    if (data._id) {
      const dataRes = await User.findById(data?._id);
      delete dataRes.password;
      return res.status(200).json({ data: dataRes });
    } else {
      return res.status(500).json(handleError(`Something went wrong`));
    }
  }

  if (req.method === "DELETE") {
    const users = verifyToken(req, res);
    const data = { ...users.userId };
    await User.findByIdAndDelete(data?._id);
    await createExpiredToken(req.body);
    return res.status(200).json({ message: "Deleted successfully" });
  }

  if (req.method === "PUT") {
    const updatePayload = req.body; // The new data you want to update
    const users = verifyToken(req, res);
    const data = { ...users.userId };
    if (!mongoose.Types.ObjectId.isValid(data._id)) {
      return res.status(400).json(handleError(`Invalid user ID`));
    }
    if (updatePayload?.password) {
      return res.status(400).json(handleError(`Password can't be change`));
    }
    if (updatePayload?.type) {
      return res.status(400).json(handleError(`Type can't be change`));
    }

    const updatedUser = await User.findByIdAndUpdate(
      data._id,
      updatePayload,
      { new: true } // Return the updated document
    );
    console.log(updatePayload, "updatePayloadupdatePayload");

    if (!updatedUser) {
      return res.status(404).json(handleError(`User not found`));
    }

    const userObj = updatedUser.toObject();
    delete userObj.password;

    return res.status(200).json({ data: userObj });
  }
  res.status(405).end({ error: "Method not allowed" }); // Method Not Allowed
}
