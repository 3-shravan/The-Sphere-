import jwt from "jsonwebtoken";
import {
  NOT_FOUND,
  TOKEN_EXPIRED,
  UNAUTHORIZED,
} from "../core/errors/customError.js";
import { ExpiredToken } from "../models/jwtToken.model.js";
import { User } from "../models/user/user.model.js";
import catchAsyncError from "./catchAsyncError.js";

export const authUser = catchAsyncError(async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) throw new UNAUTHORIZED("login to get access.");

  const isBlackListed = await ExpiredToken.findOne({ token });
  if (isBlackListed)
    throw new TOKEN_EXPIRED("Resouce revoked.Please log in again ");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded)
    throw new UNAUTHORIZED(
      "You are no more authenticated. Please log in again."
    );

  const user = await User.findById(decoded.id);
  if (!user) throw new NOT_FOUND("No user exists");

  req.user = user;
  req.userId = user._id;
  next();
});
