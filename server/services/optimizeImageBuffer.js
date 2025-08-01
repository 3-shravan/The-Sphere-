import sharp from "sharp";
export const optimizeImageBuffer = async (file) => {
  return await sharp(file.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();
};
   