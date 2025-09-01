import sharp from "sharp";
import ErrorHandler from "../middlewares/errorHandler.js";
import { uploadImage } from "../config/cloudinary.js";

export const optimizeImageBuffer = async (file) => {
  return await sharp(file.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();
};

export const processImageUpload = async (image, publicId, folderName, next) => {
  if (!image) return { public_id: null, url: null };
  try {
    const optimizedImageBuffer = await optimizeImageBuffer(image);
    const optimizedImage = {
      originalname: image.originalname,
      mimetype: "image/jpeg",
      buffer: optimizedImageBuffer,
    };
    const { url, public_id } = await uploadImage(
      optimizedImage,
      publicId,
      folderName
    );
    return { url, public_id };
  } catch (error) {
    return next(
      new ErrorHandler(500, error.message || "Failed to upload Image")
    );
  }
};
