export const handleSuccessResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    success: true,
    message: message,
    ...(data ? data : { data: null }),
  });

export const handleErrorResponse = (res, statusCode, message) =>
  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
