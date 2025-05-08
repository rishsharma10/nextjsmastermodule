import Joi from 'joi';

export const cartValidationSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'any.required': 'User ID is required',
  }),
  product_id: Joi.string().required().messages({
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
});
