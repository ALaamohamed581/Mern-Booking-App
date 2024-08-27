import Joi from "joi";

const hotelSchemas = {
  create: Joi.object({
    userId: Joi.string().optional().messages({
      "any.required": "User ID is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
    }),
    country: Joi.string().required().messages({
      "any.required": "Country is required",
    }),
    adultCount: Joi.number().required().messages({
      "any.required": "Adult count is required",
    }),
    childCount: Joi.number().required().messages({
      "any.required": "Child count is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
    }),
    facilities: Joi.array().items(Joi.string().required()).required().messages({
      "any.required": "Facilities are required",
      "array.includesRequiredUnknowns": "Each facility must be a string",
    }),
    imageURLS: Joi.array().items(Joi.string().optional()).messages({
      "any.required": "Image URLs are required",
      "array.includesRequiredUnknowns": "Each image URL must be a string",
    }),
    type: Joi.string().required().messages({
      "any.required": "Type is required",
    }),
    pricePerNight: Joi.number().required().messages({
      "any.required": "Price per night is required",
    }),
    starRating: Joi.number().min(1).max(5).required().messages({
      "any.required": "Star rating is required",
      "number.min": "Star rating must be at least 1",
      "number.max": "Star rating must be at most 5",
    }),
  }),

  update: Joi.object({
    userId: Joi.string().optional(),
    name: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    adultCount: Joi.number().optional(),
    childCount: Joi.number().optional(),
    description: Joi.string().optional(),
    facilities: Joi.array().items(Joi.string().optional()).optional(),
    // imageURLs: Joi.array().items(Joi.string().optional()).optional(),
    type: Joi.string().optional(),
    pricePerNight: Joi.number().optional(),
    starRating: Joi.number().min(1).max(5).optional(),
  }),
};

export default hotelSchemas;
