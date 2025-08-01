import ErrorHandler from "../middlewares/errorHandler.js";
import { uploadImage } from "../config/cloudinary.js";
import { optimizeImageBuffer } from "./optimizeImageBuffer.js";

export const processImageUpload = async (image, publicId, folderName, next) => {
   if (!image) return { public_id: null, url: null };
   try {
      const optimizedImageBuffer = await optimizeImageBuffer(image);
      // const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
      const optimizedImage = {
         originalname: image.originalname,
         mimetype: "image/jpeg",
         buffer: optimizedImageBuffer,
      };
      const { url, public_id } = await uploadImage(optimizedImage, publicId, folderName);
      return { public_id, url };
   } catch (error) {
      return next(new ErrorHandler(500, error.message || "Failed to upload Image"));
   }
};
