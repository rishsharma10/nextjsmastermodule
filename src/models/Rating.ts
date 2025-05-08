import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IRating extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  rating: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Optional: Prevent duplicate reviews from same user on the same product
RatingSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

const Rating = models.Rating || model<IRating>('Rating', RatingSchema);

export default Rating;
