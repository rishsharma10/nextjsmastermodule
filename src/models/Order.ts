import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IOrder extends Document {
  user_id: mongoose.Types.ObjectId;
  items: {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
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
  status: 'pending' | 'paid' | 'failed' | 'shipped' | 'delivered' | 'cancelled';
  placed_at: Date;
  delivered_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
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
        price: {
          type: Number,
          required: true,
          min: 0,
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
      enum: ['pending', 'paid', 'failed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    placed_at: {
      type: Date,
      default: Date.now,
    },
    delivered_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
