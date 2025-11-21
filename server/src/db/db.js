import mongoose from "mongoose";
import ApiError from "../core/errors/apiError.js";

export default async function connectToDB() {
  try {
    const mongoURI =
      process.env.ATLAS_MONGO_URI || process.env.COMPASS_MONGO_URI;

    if (!mongoURI)
      throw new ApiError(
        500,
        "MongoDB connection URI is missing. Please set ATLAS_MONGO_URI or COMPASS_MONGO_URI in environment variables."
      );
    await mongoose.connect(mongoURI);
    console.log(`🚀 MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`❌ Database connection error: ${err.message}`);
    process.exit(1);
  }
}
