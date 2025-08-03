import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import getDataUri from "./dataUriParser.js";
config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image, public_id, folderName) => {
  if (!image) return null;
  try {
    const imageUri = getDataUri(image);
    const cloudResponse = await cloudinary.uploader.upload(imageUri, {
      public_id: public_id,
      overwrite: true,
      folder: folderName,
    });
    return {
      url: cloudResponse.secure_url,
      publicId: cloudResponse.public_id,
    };
  } catch (error) {
    throw new Error("Failed to upload image ");
  }
};

export const deleteImage = async (publicId) => {
  if (!publicId) return null;
  try {
    await cloudinary.uploader.destroy(publicId);
    return "Image deleted successfully";
  } catch (error) {
    throw new Error("Image deletion failed");
  }
};
export default cloudinary;
