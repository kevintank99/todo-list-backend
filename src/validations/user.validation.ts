import Joi from 'joi';

export const userSchema = Joi.object({
 
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Must be a valid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
});


