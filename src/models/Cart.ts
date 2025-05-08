import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);
CartSchema.index({ user_id: 1, product_id: 1 }, { unique: true });
const Cart = models.Cart || model<ICart>('Cart', CartSchema);

export default Cart;
