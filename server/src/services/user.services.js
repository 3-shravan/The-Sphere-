import { User } from "../models/user/user.model.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const checkExistingUsers = async ({ name, phone, email }) => {
  const [nameUser, phoneUser, emailUser] = await Promise.all([
    User.findOne({ name, accountVerified: true }),
    phone ? User.findOne({ phone, accountVerified: true }) : null,
    email ? User.findOne({ email, accountVerified: true }) : null,
  ]);

  if (nameUser) throw new ErrorHandler(409, "Username already exists.");
  if (phoneUser)
    throw new ErrorHandler(409, "Phone number is already registered.");
  if (emailUser)
    throw new ErrorHandler(409, "Email address already registered.");
};

export const handleUnverifiedUser = async (user) => {
  if (user.attempts >= 3) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (user.lastAttempt > oneHourAgo)
      throw new ErrorHandler(429, "Too many attempts. Try again after 1 hour.");
    user.attempts = 0;
    user.lastAttempt = undefined;
    await user.save();
  }
  const verificationCode = await user.generateVerificationCode();
  await User.findByIdAndUpdate(user._id, {
    $inc: { attempts: 1 },
    $set: { lastAttempt: Date.now() },
  });
  await user.save();
  return verificationCode;
};
