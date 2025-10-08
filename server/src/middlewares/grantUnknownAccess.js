import jwt from "jsonwebtoken"
import { User } from "../models/user/user.model.js"
import catchAsyncError from "./catchAsyncError.js"

export const grantUnknownAccess = catchAsyncError(async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token
  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select("_id")
  } catch (_err) {
    req.user = null
  }
  next()
})
