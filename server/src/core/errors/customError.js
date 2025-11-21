import ApiError, { ErrorTypes, STATUS_CODES } from "./apiError.js";

export class BAD_REQUEST extends ApiError {
  constructor(message = "Bad Request") {
    super(STATUS_CODES.BAD_REQUEST, message, ErrorTypes.BAD_REQUEST);
  }
}
export class UNAUTHORIZED extends ApiError {
  constructor(message = "Unauthorized") {
    super(STATUS_CODES.UNAUTHORIZED, message, ErrorTypes.UNAUTHORIZED);
  }
}
export class FORBIDDEN extends ApiError {
  constructor(message = "Forbidden") {
    super(STATUS_CODES.FORBIDDEN, message, ErrorTypes.FORBIDDEN);
  }
}
export class NOT_FOUND extends ApiError {
  constructor(message = "Not Found") {
    super(STATUS_CODES.NOT_FOUND, message, ErrorTypes.NOT_FOUND);
  }
}
export class CONFLICT extends ApiError {
  constructor(message = "Conflict") {
    super(STATUS_CODES.CONFLICT, message, ErrorTypes.CONFLICT);
  }
}
export class INTERNAL_SERVER_ERROR extends ApiError {
  constructor(message = "Internal Server Error") {
    super(STATUS_CODES.INTERNAL_SERVER_ERROR, message, ErrorTypes.INTERNAL);
  }
}
export class SERVICE_UNAVAILABLE extends ApiError {
  constructor(message = "Service Unavailable") {
    super(
      STATUS_CODES.SERVICE_UNAVAILABLE,
      message,
      ErrorTypes.SERVICE_UNAVAILABLE
    );
  }
}
export class TOKEN_EXPIRED extends ApiError {
  constructor(message = "Token Expired") {
    super(STATUS_CODES.UNAUTHORIZED, message, ErrorTypes.TOKEN_EXPIRED);
  }
}
export class BAD_TOKEN extends ApiError {
  constructor(message = "Bad Token") {
    super(STATUS_CODES.UNAUTHORIZED, message, ErrorTypes.BAD_TOKEN);
  }
}
export class ACCESS_TOKEN_ERROR extends ApiError {
  constructor(message = "Access Token Error") {
    super(STATUS_CODES.UNAUTHORIZED, message, ErrorTypes.ACCESS_TOKEN_ERROR);
  }
}

export class VALIDATION_ERROR extends ApiError {
  constructor(message = "Validation Error") {
    super(STATUS_CODES.VALIDATION_ERROR, message, ErrorTypes.VALIDATION_ERROR);
  }
}
