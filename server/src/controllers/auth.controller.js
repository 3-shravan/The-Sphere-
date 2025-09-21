import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/user/user.model.js";
import { validatePhoneNo } from "../utils/validations.js";
import { ExpiredToken } from "../models/jwtToken.model.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";
import { generateResetEmailTemplate } from "../utils/emailTemplate.js";
import {
  sendVerificationCode,
  makePhoneCall,
  sendEmail,
  sendToken,
  crpytPassword,
} from "../services/auth.services.js";
import {
  checkExistingUsers,
  handleUnverifiedUser,
} from "../services/user.services.js";

export const register = catchAsyncError(async (req, res, next) => {
  let { name, email, phone, password, verificationMethod } = req.body;

  phone = phone?.trim() || undefined;
  email = email?.trim() || undefined;

  if (verificationMethod === "phone" && !validatePhoneNo(phone))
    throw new ErrorHandler(400, "Please enter a valid phone number.");

  await checkExistingUsers({ name, phone, email });

  let isExistUnverifiedUser = await User.findOne({
    $or: [
      { phone: { $exists: true, $eq: phone }, accountVerified: false },
      { email: { $exists: true, $eq: email }, accountVerified: false },
    ],
  });
  let verificationCode;
  if (isExistUnverifiedUser)
    verificationCode = await handleUnverifiedUser(isExistUnverifiedUser);
  else {
    // Create new
    const user = await User.create({ name, phone, email, password });
    verificationCode = await user.generateVerificationCode();
    await User.findByIdAndUpdate(user._id, {
      $set: { attempts: 0, lastAttempt: undefined },
    });
    await user.save({ validateBeforeSave: false });
  }
  const message = await sendVerificationCode(
    verificationMethod,
    verificationCode,
    name,
    email,
    phone
  );
  handleSuccessResponse(res, 200, message);
});

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, phone, otp } = req.body;

  if (phone && !validatePhoneNo(phone))
    return next(new ErrorHandler(400, "Invalid phone number"));

  const query = { accountVerified: false };

  if (phone && email) query.$or = [{ phone }, { email }];
  else if (phone) query.phone = phone;
  else if (email) query.email = email;

  const user = await User.findOne(query);
  if (!user)
    return next(new ErrorHandler(404, "No user found to be verified."));

  const verificationcode = user.verificationCode;
  console.log(verificationcode, otp);
  if (verificationcode != Number(otp))
    throw new ErrorHandler(400, "Invalid OTP");

  //check if the provided OTP is expired one
  const expireTime = new Date(user.verificationCodeExpire).getTime();
  if (expireTime < Date.now())
    throw new ErrorHandler(400, "OTP Expired. Please request a new one.");

  user.accountVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;
  user.attempts = undefined;
  user.lastAttempt = undefined;
  user.resetPassword = false;
  await user.save({ validateModifiedOnly: true });

  sendToken(user, 200, "Account Successfully Verified", res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, phone, password } = req.body;

  const query = { accountVerified: true };
  if (phone) query.phone = phone;
  else query.email = email;

  const user = await User.findOne(query).select("+password");
  if (!user) throw new ErrorHandler(404, "No user found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler(400, "Incorrect password. Please try again."));

  sendToken(user, 200, "Login Successfull 🚀", res);
});

export const logout = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  try {
    await ExpiredToken.create({ token });
  } catch (error) {
    throw new ErrorHandler(500, `token is not blacklisted.`);
  }
  res.clearCookie("token", { httpOnly: true });
  res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true });
  handleSuccessResponse(res, 200, "logged out 😢");
});

export const getUser = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email, phone } = req.body;

  if (phone && !validatePhoneNo(phone))
    throw new ErrorHandler(400, "Please enter a valid phone number.");

  const query = { accountVerified: true };
  email ? (query.email = email) : (query.phone = phone);

  const user = await User.findOne(query);
  if (!user)
    throw new ErrorHandler(404, `No user is registered with ${email || phone}`);

  try {
    if (email) {
      const resetToken = await user.generateResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      const baseUrl = process.env.LOCALHOST_URL || process.env.CLIENT_URL;
      const resetPasswordUrl = `${baseUrl}/reset-password/email/${resetToken}`;
      const message = generateResetEmailTemplate(resetPasswordUrl);
      await sendEmail({ email, subject: "Your Reset Password Link", message });
      return handleSuccessResponse(
        res,
        200,
        `Reset password link is sent to ${email}`
      );
    }
    if (phone) {
      const resetPasswordOTP = await user.generateResetPasswordOTP();
      await user.save({ validateBeforeSave: false });
      await makePhoneCall(
        "",
        phone,
        resetPasswordOTP,
        "for reseting the password"
      );
      return handleSuccessResponse(
        res,
        200,
        `Verification code to reset your password has been sent`
      );
    }
  } catch (error) {
    if (email) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
    }
    if (phone) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpire = undefined;
    }
    await user.save({ validateBeforeSave: false });
    throw new ErrorHandler(
      400,
      error.message ||
        (email
          ? "Failed to send password reset link"
          : "Failed to make call for verification Code for reset")
    );
  }
});

export const verifyResetPasswordOTP = catchAsyncError(
  async (req, res, next) => {
    const { phone, otp } = req.body;

    const user = await User.findOne({
      phone,
      resetPasswordOTP: otp,
      resetPasswordOTPExpire: { $gt: Date.now() },
    });
    if (!user) throw new ErrorHandler(400, "Invalid OTP");

    user.resetPassword = true;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;
    await user.save({ validateBeforeSave: false });
    handleSuccessResponse(res, 200, "OTP Verified.");
  }
);

export const resetPasswordWithEmailToken = catchAsyncError(
  async (req, res, next) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword)
      throw new ErrorHandler(400, "Please provide new and confirm password");

    if (newPassword !== confirmPassword)
      throw new ErrorHandler(400, "Passwords do not match");

    const resetPasswordToken = crpytPassword(token);
    const user = await User.findOne({
      resetPasswordToken,
      accountVerified: true,
      resetPasswordTokenExpire: { $gt: Date.now() },
    }).select("+password");
    if (!user) throw new ErrorHandler(400, "Invalid or expired token");

    const isMatch = await user.comparePassword(newPassword);
    if (isMatch)
      throw new ErrorHandler(400, "Previously used password. Use a new one.");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();
    return handleSuccessResponse(res, 200, "Password reset successfully");
  }
);

export const resetPasswordWithPhone = catchAsyncError(
  async (req, res, next) => {
    const { phone } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword)
      throw new ErrorHandler(400, "Please provide new and confirm password");

    if (newPassword !== confirmPassword)
      throw new ErrorHandler(400, "Passwords do not match");

    const user = await User.findOne({
      phone,
      accountVerified: true,
      resetPassword: true,
    }).select("+password");

    if (!user)
      throw new ErrorHandler(400, "Unauthorized or invalid phone-based reset");

    const isMatch = await user.comparePassword(newPassword);
    if (isMatch)
      throw new ErrorHandler(400, "Previously used password. Use a new one.");

    user.password = newPassword;
    user.resetPassword = false;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;
    user.attempts = undefined;
    await user.save();

    return handleSuccessResponse(res, 200, "Password reset successfully.");
  }
);

import { validateUsername } from "../validations/auth.schemas.js";

export const usernameAvailability = catchAsyncError(async (req, res) => {
  const { username } = req.query;

  const validationError = validateUsername(username);
  if (validationError)
    return res.json({ available: false, message: validationError });

  const reservedUsernames = ["shravan", "admin", "test"];
  if (reservedUsernames.includes(username))
    return res.json({ available: false, message: "username is reserved" });

  const existingUser = await User.findOne({ name: username });
  if (existingUser)
    return res.json({ available: false, message: "username already taken" });

  return res.json({ available: true, message: "username is available" });
});
