import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastSeen: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        lastSeenAt: { type: Date, default: Date.now },
      },
    ],
    unreadMessages: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        count: { type: Number, default: 0 },
      },
    ],
    groupName: {
      type: String,
      default: "",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupPicture: {
      type: String,
      default: "",
    },
    groupPicturePublicId: {
      type: String,
      default: "",
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupDescription: {
      type: String,
      default: "",
    },
    groupCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
)

export const Chat = mongoose.model("Chat", chatSchema)
