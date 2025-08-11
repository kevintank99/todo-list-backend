import Joi from 'joi';
import {parseLocalDateToUTCDate} from '../utils/dateUtils';
export const createTodoSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().trim().optional(),
  dueDate: Joi.any()
  .custom((value, helpers) => {
    try {
      const date = parseLocalDateToUTCDate(value);
      if (date <= new Date()) {
        return helpers.error('date.greater');
      }
      return date; // Return the Date object to Joi
    } catch (err) {
      return helpers.error('any.invalid');
    }
  }, 'DD/MM/YYYY date parser')
  .required()
  .messages({
    'any.invalid': 'Due date must be a valid DD/MM/YYYY date',
    'date.greater': 'Due date must be in the future.',
    'any.required': 'Due date is required',
  }),
  user: Joi.string().required()
});

export const updateTodoSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(''),
    dueDate: Joi.any()
      .custom((value, helpers) => {
        // If no dueDate provided, skip parsing (optional field)
        if (value === undefined) return value;
  
        try {
          const date = parseLocalDateToUTCDate(value);
          if (date <= new Date()) {
            return helpers.error('date.greater');
          }
          return date;
        } catch {
          return helpers.error('any.invalid');
        }
      }, 'DD/MM/YYYY date parser')
      .messages({
        'any.invalid': 'Due date must be a valid DD/MM/YYYY date',
        'date.greater': 'Due date must be in the future.',
      }),
    completed: Joi.boolean(),
  })
    .min(1) // At least one field required for update
    .messages({
      'object.min': 'At least one field must be provided for update',
    });
  
