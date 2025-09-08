import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postType: {
      type: String,
      enum: ["thought", "media"],
      default: "media",
    },
    thoughts: {
      type: String,
      default: "",
      maxLength: [5000, "Thoughts cannot exceed 5000 characters"],
    },
    caption: {
      type: String,
      default: "",
      maxLength: [500, "Caption cannot exceed 500 characters"],
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
