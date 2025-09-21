import { authUser } from "../middlewares/authUser.js";
import {
  forgetPassword,
  getUser,
  login,
  logout,
  register,
  resetPasswordWithEmailToken,
  resetPasswordWithPhone,
  usernameAvailability,
  verifyOTP,
  verifyResetPasswordOTP,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  otpVerificationSchema,
  forgotPasswordSchema,
  resetOtpVerificationSchema,
  resetPasswordParamsSchema,
  resetPasswordBodySchema,
  resetPasswordWithPhoneBodySchema,
  resetPasswordWithPhoneParamSchema,
} from "../validations/auth.schemas.js";

import express from "express";
const router = express.Router();

router.get("/check-username", usernameAvailability);
router.post("/register", validate(registerSchema), register);
router.post("/verify-otp", validate(otpVerificationSchema), verifyOTP);
router.post("/login", validate(loginSchema), login);
router.get("/logout", authUser, logout);
router.get("/profile", authUser, getUser);

router.post("/forget-password", validate(forgotPasswordSchema), forgetPassword);
router.post(
  "/forget-password/verify-otp",
  validate(resetOtpVerificationSchema),
  verifyResetPasswordOTP
);

router.put(
  "/reset-password/email/:token",
  validate(resetPasswordParamsSchema, "params"),
  validate(resetPasswordBodySchema),
  resetPasswordWithEmailToken
);
router.put(
  "/reset-password/phone/:phone",
  validate(resetPasswordWithPhoneParamSchema, "params"),
  validate(resetPasswordWithPhoneBodySchema),
  resetPasswordWithPhone
);

export default router;
