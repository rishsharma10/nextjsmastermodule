import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  // type: Joi.string().valid('USER', 'ADMIN').required().messages({
  //   'any.only': 'Type must be USER or ADMIN',
  // }),
});
