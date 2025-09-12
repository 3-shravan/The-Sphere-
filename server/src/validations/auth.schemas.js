import Joi from "joi";
import { validatePhoneNo } from "../utils/validations.js";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).lowercase().required().messages({
    "string.base": "username must be a text",
    "string.empty": "username is required",
    "string.min": "username should have at least {#limit} characters",
    "string.max": "username should not exceed {#limit} characters",
    "any.required": "username is required",
  }),
  phone: Joi.string().trim().empty("").allow(null, ""),
  email: Joi.string().trim().empty("").email().allow(null, ""),
  password: Joi.string().min(6).required(),
  verificationMethod: Joi.string().valid("phone", "email").required().messages({
    "any.only": "Verification method must be either 'phone' or 'email'",
    "any.required": "Verification method is required",
  }),
})
  .xor("phone", "email")
  .messages({
    "object.missing": "Either phone or email must be provided",
    "object.xor": "You can provide only one of phone or email, not both",
  });

export const otpVerificationSchema = Joi.object({
  email: Joi.string().trim().empty("").email().optional(),
  phone: Joi.string()
    .trim()
    .empty("")
    .custom((value, helpers) => {
      if (value && !validatePhoneNo(value))
        return helpers.message("Invalid phone number");
      return value;
    })
    .optional(),
  otp: Joi.number().required().messages({
    "any.required": "OTP is required",
    "number.base": "OTP must be a number",
  }),
})
  .xor("email", "phone")
  .messages({
    "object.missing": "Please provide either email or phone along with OTP",
    "object.xor": "Provide either email or phone, not both",
  });

export const loginSchema = Joi.object({
  email: Joi.string().trim().empty("").email().optional(),
  phone: Joi.string()
    .trim()
    .empty("")
    .custom((value, helpers) => {
      if (value && !validatePhoneNo(value))
        return helpers.message("Invalid phone number");
      return value;
    })
    .optional(),
  password: Joi.string().required(),
})
  .xor("email", "phone")
  .messages({
    "object.missing":
      "Please provide either email or phone along with password",
    "object.xor": "Provide either email or phone, not both",
  });

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().empty("").email().optional(),
  phone: Joi.string()
    .trim()
    .empty("")
    .custom((value, helpers) => {
      if (value && !validatePhoneNo(value))
        return helpers.message("Invalid phone number");
      return value;
    })
    .optional(),
})
  .xor("email", "phone")
  .messages({
    "object.missing": "Please provide either email or phone",
    "object.xor": "Provide either email or phone, not both",
  });

export const resetOtpVerificationSchema = Joi.object({
  phone: Joi.string()
    .trim()
    .empty("")
    .custom((value, helpers) => {
      if (value && !validatePhoneNo(value))
        return helpers.message("Invalid phone number");
      return value;
    })
    .required()
    .messages({
      "any.required": "Phone number is required",
    }),
  otp: Joi.number().required().messages({
    "any.required": "OTP is required",
    "number.base": "OTP must be a number",
  }),
});

export const resetPasswordParamsSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "Token is required",
  }),
});

export const resetPasswordBodySchema = Joi.object({
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
});

export const resetPasswordWithPhoneParamSchema = Joi.object({
  phone: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (!validatePhoneNo(value))
        return helpers.message("Invalid phone number");
      return value;
    })
    .required()
    .messages({
      "any.required": "Phone number is required",
    }),
});
export const resetPasswordWithPhoneBodySchema = Joi.object({
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
});
