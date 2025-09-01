import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  forgetPassword,
  getUser,
  login,
  logout,
  register,
  resetPasswordWithEmailToken,
  resetPasswordWithPhone,
  verifyOTP,
  verifyResetPasswordOTP,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout", authUser, logout);
router.get("/profile", authUser, getUser);

router.post("/forget-password", forgetPassword);
router.post("/forget-password/verify-otp", verifyResetPasswordOTP);

router.put("/reset-password/email/:token", resetPasswordWithEmailToken);
router.put("/reset-password/phone/:phone", resetPasswordWithPhone);

export default router;
