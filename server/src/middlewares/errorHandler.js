class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.statusCode = statusCode;
    this.originalMessage = message; // Store the original message
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.originalMessage =
    err.originalMessage || err.message || "Internal Server Error";

  if (
    typeof err.originalMessage === "string" &&
    err.originalMessage.includes("buffering timed out")
  ) {
    err = new ErrorHandler(
      503,
      "Database is not responding. Please try again later."
    );
  }

  if (err.name === "CastError") {
    err = new ErrorHandler(400, `Invalid ${err.path}: ${err.value}`);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler(401, "Invalid token. Try again!");
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(401, "Token expired! Please login again.");
  }

  if (err.code === 11000) {
    const message = `Duplicate field value entered for: ${Object.keys(
      err.keyValue
    )}`;
    err = new ErrorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    errors: Array.isArray(err.originalMessage)
      ? err.originalMessage
      : [err.originalMessage],

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });

  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }
};
