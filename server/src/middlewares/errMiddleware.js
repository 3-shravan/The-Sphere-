import ApiError from "../core/errors/apiError.js";
import {
  BAD_REQUEST,
  BAD_TOKEN,
  CONFLICT,
  SERVICE_UNAVAILABLE,
  TOKEN_EXPIRED,
} from "../core/errors/customError.js";

export const errorMiddleware = (err, _req, res, _next) => {
  /**
   ** Handle unknown errors
   */
  if (!(err instanceof ApiError))
    err = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    );

  if (err.code === 11000)
    err = new CONFLICT(`Duplicate field entered: ${Object.keys(err.keyValue)}`);

  if (err.name === "CastError")
    err = new BAD_REQUEST(`Invalid ${err.path}: ${err.value}`);

  if (err.name === "JsonWebTokenError")
    err = new BAD_TOKEN("Token is invalid, try again!");

  if (err.name === "TokenExpiredError")
    err = new TOKEN_EXPIRED("Token expired, login again!");

  if (String(err.message).includes("buffering timed out"))
    err = new SERVICE_UNAVAILABLE("Database timeout error");

  res.status(err.statusCode).json({
    success: false,
    type: err.type,
    message: err.message,
    data: null,
  });

  if (process.env.NODE_ENV === "development")
    console.error("❌ Error:", err.message);
};
