import { checkoutValidationSchema } from '@/joi/checkout';
import Checkout from '@/models/Checkout';
import Order from '@/models/Order';
import { handleError, verifyToken } from '@/utils/validation';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const user = await verifyToken(req,res);
    if (!user) {
      return res.status(401).json(handleError("Unauthorized"));
    }

  const { error } = checkoutValidationSchema.validate({...req.body,user_id:user.userId._id});
  if (error) {
    return res.status(400).json(handleError(error.details[0].message));
  }


  try {
    const checkout = await Checkout.create({...req.body,user_id:user.userId._id});
    console.log(checkout,"checkoutuuuuuu")
    const newObj =await {...checkout}
    delete newObj.updatedAt
    delete newObj.createdAt
    delete newObj.__v
    delete newObj._id
    console.log(newObj,"newobjjjj")
        const orderCreate = await Order.create(newObj);
        const data = orderCreate.toObject()
        return res.status(201).json({data});
  } catch (err: any) {
    return res.status(500).json(handleError(err.message));
  }

}
