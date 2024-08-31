const Joi = require("joi");

const bookingSchema = {
  create: Joi.object({
    firstName: Joi.string().required().messages({
      "string.base": "First name should be a type of text",
      "string.empty": "First name cannot be empty",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().required().messages({
      "string.base": "Last name should be a type of text",
      "string.empty": "Last name cannot be empty",
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
    adultCount: Joi.number().integer().min(1).required().messages({
      "number.base": "Adult count should be a valid number",
      "number.integer": "Adult count must be an integer",
      "number.min": "At least one adult is required",
      "any.required": "Adult count is required",
    }),
    childCount: Joi.number().integer().min(0).required().messages({
      "number.base": "Child count should be a valid number",
      "number.integer": "Child count must be an integer",
      "number.min": "Child count cannot be negative",
      "any.required": "Child count is required",
    }),
    checkIn: Joi.date().iso().required().messages({
      "date.base": "Check-in date should be a valid ISO date",
      "any.required": "Check-in date is required",
    }),
    checkOut: Joi.date().iso().required().messages({
      "date.base": "Check-out date should be a valid ISO date",
      "any.required": "Check-out date is required",
    }),
    paymentIntentId: Joi.string().required().messages({
      "date.base": "Check-out date should be a valid ISO date",
      "any.required": "Check-out date is required",
    }),

    // Add similar custom messages for other fields
    // ...
  }),
};
export default bookingSchema;
