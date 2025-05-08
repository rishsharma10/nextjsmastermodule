import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have at least 2 characters',
    'any.required': 'Product name is required',
  }),
  description: Joi.string().min(10).required().messages({
    'string.min': 'Description should be at least 10 characters',
    'any.required': 'Product description is required',
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be greater than 0',
    'any.required': 'Price is required',
  }),
  category: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Product category is required',
  }),
  stock: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock cannot be negative',
  }),
  images: Joi.array().items(Joi.string().uri()).messages({
    'string.uri': 'Each image must be a valid URL',
  }),
  in_cart: Joi.boolean().messages({
    'string.uri': 'Each image must be a valid URL',
  }),
  createdBy: Joi.string().required().messages({
    'string.base': 'createdBy must be a string',
    'any.required': 'createdBy is required',
  }),
});
