export const handleSuccessResponse = (res, statusCode, responseMessage, data = undefined) => {
   return res.status(statusCode).json({
      success: true,
      message: responseMessage,
      data
   })
}
export const handleErrorResponse = (res, statusCode, responseMessage) => {
   return res.status(statusCode).json({
      success: false,
      message: responseMessage
   })
}