import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
   blockerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   blockedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },

}, { timestamps: true });

export const Block = mongoose.model("Block", blockSchema);
