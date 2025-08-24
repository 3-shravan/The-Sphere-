class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, _, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.message && err.message.includes("buffering timed out")) {
    err = new ErrorHandler(
      503,
      "Database is not responding. Please try again later."
    );
  }
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(400, message);
  }
  if (err.name === "jsonWebTokenError") {
    const message = "Invalid token.Try again !!!";
    err = new ErrorHandler(401, message);
  }
  if (err.name === "TokenExpiredError") {
    const message = "expired !!! Please login again";
    err = new ErrorHandler(401, message);
  }

  if (err.code === 11000) {
    const message = ` Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
