import Joi from 'joi';

export const ratingValidationSchema = Joi.object({
  user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  product_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().max(1000).optional()
});
