import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface ICheckout extends Document {
  user_id: mongoose.Types.ObjectId;
  cart_items: {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  shipping_address: {
    full_name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_method: 'card' | 'cash_on_delivery' | 'upi' | 'wallet';
  total_amount: number;
  status: 'pending' | 'paid' | 'failed' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

const CheckoutSchema = new Schema<ICheckout>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cart_items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    shipping_address: {
      full_name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment_method: {
      type: String,
      enum: ['card', 'cash_on_delivery', 'upi', 'wallet'],
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Checkout = models.Checkout || model<ICheckout>('Checkout', CheckoutSchema);

export default Checkout;
