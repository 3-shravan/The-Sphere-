import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    media: {
      type: String,
      default: null,
    },
    public_id: {
      type: String,
      default: null,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
