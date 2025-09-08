import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import DataUriParser from "datauri/parser.js";
import path from "path";
import sharp from "sharp";
import ErrorHandler from "../middlewares/errorHandler.js";

const parser = new DataUriParser();
config({ path: "./src/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getDataUri = (file) => {
  const extensionName = path.extname(file.originalname).toString();
  return parser.format(extensionName, file.buffer).content;
};

/**
 * Optimize image using sharp
 */
const optimizeImageBuffer = async (file) => {
  return await sharp(file.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();
};

/**
 * Upload file (image or video)
 * @param {Object} file - Multer file object
 * @param {string} public_id - Desired public ID
 * @param {string} folderName - Folder in Cloudinary
 * @param {"image"|"video"} type - Resource type
 * @param {boolean} optimize - Optimize images before upload
 */
export const uploadFile = async (
  file,
  public_id,
  folderName,
  type = "image",
  optimize = true
) => {
  if (!file) return null;
  try {
    let uploadFile = file;
    if (optimize && type === "image") {
      const optimizedBuffer = await optimizeImageBuffer(file);
      uploadFile = {
        originalname: file.originalname,
        mimetype: "image/jpeg",
        buffer: optimizedBuffer,
      };
    }

    const fileUri = getDataUri(uploadFile);
    const cloudResponse = await cloudinary.uploader.upload(fileUri, {
      resource_type: type,
      public_id,
      overwrite: true,
      folder: folderName,
    });

    return {
      url: cloudResponse.secure_url,
      publicId: cloudResponse.public_id,
      type,
    };
  } catch (error) {
    throw new ErrorHandler(500, `Failed to upload ${type} to Cloudinary`);
  }
};

/**
 * Delete file (image or video)
 * @param {string} publicId - Cloudinary public ID
 * @param {"image"|"video"} type - Resource type
 */
export const deleteFile = async (publicId, type = "image") => {
  if (!publicId) return null;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });

    if (result.result === "ok") {
      return `${type} deleted successfully`;
    } else if (result.result === "not found") {
      return `${type} not found in Cloudinary`;
    } else {
      throw new ErrorHandler(
        500,
        `Unexpected Cloudinary response: ${result.result}`
      );
    }
  } catch (error) {
    // console.error(`Cloudinary ${type} Deletion Error:`, error.message);
    throw new ErrorHandler(500, `${type} deletion failed in Cloudinary`);
  }
};

export default cloudinary;
