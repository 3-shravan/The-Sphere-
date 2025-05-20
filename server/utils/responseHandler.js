export const handleSuccessResponse = (res, statusCode, responseMessage, data = undefined) => {
   let response = {
      success: true,
      message: responseMessage
   };
   if (data !== undefined) {
      response = { ...response, ...data };
   }

   return res.status(statusCode).json(response);
}
export const handleErrorResponse = (res, statusCode, responseMessage) => {
   return res.status(statusCode).json({
      success: false,
      message: responseMessage
   })
}