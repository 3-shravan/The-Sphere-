export const handleSuccessResponse = (res, statusCode, responseMessage, data) =>
  res.status(statusCode).json({
    success: true,
    message: responseMessage,
    ...(data ? data : { data: null }),
  });

export const handleErrorResponse = (res, statusCode, responseMessage) =>
  res.status(statusCode).json({
    success: false,
    message: responseMessage,
    data: null,
  });
