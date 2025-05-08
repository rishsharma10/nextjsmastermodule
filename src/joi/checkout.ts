import Joi from 'joi';

export const checkoutValidationSchema = Joi.object({
  user_id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),

  cart_items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),

  shipping_address: Joi.object({
    full_name: Joi.string().min(3).max(100).required(),
    street: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100).required(),
    postal_code: Joi.string().min(4).max(10).required(),
    country: Joi.string().min(2).max(100).required(),
  }).required(),

  payment_method: Joi.string()
    .valid('card', 'cash_on_delivery', 'upi', 'wallet')
    .required(),

  total_amount: Joi.number().min(0).required()
});
