export const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
export const ErrorTypes = {
  BAD_REQUEST: "BadRequest",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "NotFound",
  VALIDATION_ERROR: "ValidationError",
  FORBIDDEN: "Forbidden",
  CONFLICT: "Conflict",
  INTERNAL: "InternalServerError",
  SERVICE_UNAVAILABLE: "ServiceUnavailable",
  TOKEN_EXPIRED: "TokenExpired",
  BAD_TOKEN: "BadToken",
  ACCESS_TOKEN_ERROR: "AccessTokenError",
};

export default class ApiError extends Error {
  constructor(statusCode, message, type) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
  static handle(err, res) {
    res.status(err.statusCode || 500).json({
      success: false,
      type: err.type || ErrorTypes.INTERNAL,
      message: err.message,
      data: null,
    });
  }
}
