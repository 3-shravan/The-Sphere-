import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .lowercase()
    .pattern(/^[a-z0-9._]+$/)
    .required()
    .messages({
      "string.empty": "Username is required.",
      "string.min": "Username must be at least 3 characters.",
      "string.lowercase": "Username must be in lowercase.",
      "string.pattern.base":
        "username can only contain lowercase letters, numbers, dots, and underscores",
      "string.max": "Username cannot be more than 20 characters.",
    }),
  fullName: Joi.string().trim().max(50).optional().allow(null, ""),
  bio: Joi.string().trim().max(220).optional().allow(null, ""),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dob: Joi.date().iso().optional().messages({
    "date.format": "Date of birth must be in YYYY-MM-DD format",
  }),
});

export const getProfileSchema = Joi.object({
  params: Joi.object({
    username: Joi.string().trim().min(3).max(20).required().messages({
      "string.empty": "Username is required.",
      "string.min": "Username must be at least 3 characters.",
      "string.max": "Username cannot be more than 20 characters.",
    }),
  }),
});
