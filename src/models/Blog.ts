import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy:any
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);

export default Blog;
