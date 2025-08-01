import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
      default: "",
      maxLength: [500, "Caption cannot exceed 500 characters"],
    },
    thoughts: {
      type: String,
      default: "",
      maxLength: [1000, "Thoughts cannot exceed 1000 characters"],
    },
    media: {
      type: String,
    },
    public_id: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    location: {
      type: String,
      default: "",
      maxLength: [100, "Location cannot exceed 100 characters"],
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
