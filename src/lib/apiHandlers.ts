import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; // or your auth strategy
import Blog from "@/models/Blog";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

type Options = {
  requireAuth?: boolean;
  authorize?: (user: any, req: NextApiRequest) => boolean; // Custom auth check
};

const verifyToken = (req: NextApiRequest): any | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Use your secret key
    return decoded;
  } catch {
    return null;
  }
};

export async function handleByIdMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  Model: mongoose.Model<any>,
  options: Options = {}
) {
  const { id } = req.query;

  if (!isValidObjectId(id as string)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const user = options.requireAuth ? verifyToken(req) : null;
  if (options.requireAuth && !user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if(options?.requireAuth){
    if (options.authorize && !options.authorize(user?.userId, req)) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  try {
    switch (req.method) {
      case "GET": {
        const item = await Model.findById(id);
        const blogs = await Blog.aggregate([
          {
            $lookup: {
              from: 'user', // collection name in MongoDB (lowercase plural of model)
              localField: 'createdBy', // Blog.createdBy
              foreignField: '_id',     // User._id
              as: 'author'
            }
          },
          {
            $unwind: '$author' // convert array to single object
          },
          {
            $project: {
              title: 1,
              description: 1,
              createdAt: 1,
              updatedAt: 1,
              email: '$author.email' // include author's email
            }
          }
        ]);
        console.log(blogs,"blogssss");
        console.log(item,"itemsmmmsss");
        
        
        if (!item) return res.status(404).json({ error: "Not found" });
        return res.status(200).json({ data:item });
      }

      case "PUT": {

        const updated = await Model.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updated) return res.status(404).json({ error: "Not found" });
        return res
          .status(200)
          .json({ data: updated, message: "Updated successfully" });
      }

      case "DELETE": {
        const deleted = await Model.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        return res.status(200).json({ message: "Deleted successfully" });
      }

      default:
        return res
          .setHeader("Allow", ["GET", "PUT", "DELETE"])
          .status(405)
          .end();
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Server Error" });
  }
}
