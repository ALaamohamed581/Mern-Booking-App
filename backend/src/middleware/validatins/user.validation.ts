import Joi from "joi";

const Userschemas = {
  registration: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "Confirm password is required",
      }),
    firstName: Joi.string().required().messages({
      "any.required": "First name is required",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
    }),
    image: Joi.object().optional().messages({
      "object.base": "Image must be an object",
    }),
  }),

  signIn: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  }),

  updateProfile: Joi.object({
    email: Joi.string().email().optional().messages({
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(6).optional().messages({
      "string.min": "Password must be at least 6 characters long",
    }),
    firstName: Joi.string().optional().messages({
      "string.base": "First name must be a string",
    }),
    lastName: Joi.string().optional().messages({
      "string.base": "Last name must be a string",
    }),
  }),

  imageUpload: Joi.object({
    image: Joi.object().optional().messages({
      "any.required": "Image is required",
      "object.base": "Image must be an object",
    }),
  }),

  resetPassword: Joi.object({
    newPassword: Joi.string().min(6).required().messages({
      "string.min": "New password must be at least 6 characters long",
      "any.required": "New password is required",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "Confirm password is required",
      }),
  }),
};

export default Userschemas;
