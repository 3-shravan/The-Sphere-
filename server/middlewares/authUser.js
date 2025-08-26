import { ExpiredToken } from "../models/blackListedTokenModel.js";
import { User } from "../models/user.model.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

/* Validation MiiddleWare */
export const authUser = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return next(new ErrorHandler(401, "login to get access."));
  }
  //check whether user trying to acces data with expire or unauthorize token
  const isBlackListed = await ExpiredToken.findOne({ token });
  if (isBlackListed)
    return next(new ErrorHandler(401, "Resouce revoked.Please log in again "));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      new ErrorHandler(
        401,
        "You are no more authenticated. Please log in again."
      )
    );
  }

  const user = await User.findById(decoded.id);
  if (!user) return next(new ErrorHandler(404, "No user exists"));

  req.user = user;
  next();
});
