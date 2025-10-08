import mongoose from "mongoose"

const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
)

export const ExpiredToken = mongoose.model("ExpiredToken", blackListTokenSchema)
