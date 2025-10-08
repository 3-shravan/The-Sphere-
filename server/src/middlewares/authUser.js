import jwt from "jsonwebtoken"
import { ExpiredToken } from "../models/jwtToken.model.js"
import { User } from "../models/user/user.model.js"
import catchAsyncError from "./catchAsyncError.js"
import ErrorHandler from "./errorHandler.js"

export const authUser = catchAsyncError(async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

  if (!token) throw new ErrorHandler(401, "login to get access.")

  const isBlackListed = await ExpiredToken.findOne({ token })
  if (isBlackListed) throw new ErrorHandler(401, "Resouce revoked.Please log in again ")

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (!decoded) throw new ErrorHandler(401, "You are no more authenticated. Please log in again.")

  const user = await User.findById(decoded.id)
  if (!user) throw new ErrorHandler(404, "No user exists")

  req.user = user
  req.userId = user._id
  next()
})
