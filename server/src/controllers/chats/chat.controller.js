import catchAsyncError from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { Chat } from "../../models/chats/chat.model.js";
import { Message } from "../../models/chats/message.model.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";

export const connections = catchAsyncError(async (req, res, next) => {
  const userId = String(req.user._id);
  const chats = await Chat.find({ users: userId })
    .populate([
      { path: "users", select: "name profilePicture" },
      {
        path: "lastMessage",
        select: "content sender isLiked createdAt",
        populate: { path: "sender", select: "name profilePicture" },
      },
      { path: "admins", select: "name profilePicture" },
      { path: "groupCreatedBy", select: "name profilePicture" },
    ])
    .sort({ updatedAt: -1 })
    .lean();

  const formattedChats = chats.map((chat) => {
    const otherUsers = chat.users.filter((u) => String(u._id) !== userId);
    return {
      _id: chat._id,
      isGroupChat: chat.isGroupChat,
      users: otherUsers,
      lastMessage: chat.lastMessage || null,
      updatedAt: chat.updatedAt,
      ...(chat.isGroupChat && {
        groupName: chat.groupName,
        groupPicture: chat.groupPicture,
        groupDescription: chat.groupDescription,
        admins: chat.admins,
        groupCreatedBy: chat.groupCreatedBy,
      }),
    };
  });
  handleSuccessResponse(res, 200, "Chats fetched successfully", {
    connections: formattedChats,
  });
});

export const getChat = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId)
    .populate([
      { path: "users", select: "name profilePicture" },
      {
        path: "lastMessage",
        select: "content sender isLiked createdAt",
        populate: { path: "sender", select: "name profilePicture" },
      },
      { path: "admins", select: "name profilePicture" },
      { path: "groupCreatedBy", select: "name profilePicture" },
    ])
    .lean();

  if (!chat) return next(new ErrorHandler(404, "Chat does not exist"));

  if (req.query.includeMessages === "true")
    chat.messages = await Message.find({ chat: chat._id })
      .populate("sender", "name profilePicture")
      .sort({ createdAt: -1 })
      .limit(300)
      .lean();

  if (!chat.isGroupChat) {
    const {
      groupName,
      groupDescription,
      groupPicture,
      groupPicturePublicId,
      groupCreatedBy,
      admins,
      ...rest
    } = chat;
    handleSuccessResponse(res, 200, "Chat fetched successfully", {
      chat: rest,
    });
  } else {
    handleSuccessResponse(res, 200, "Chat fetched successfully", { chat });
  }
});

export const deleteChat = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId).lean();
  if (!chat) return next(new ErrorHandler(404, "Chat not found"));

  if (chat.isGroupChat)
    return next(new ErrorHandler(400, "You can't delete a group chat"));

  const isParticipant = chat.users.some(
    (u) => u.toString() === req.user._id.toString()
  );
  if (!isParticipant)
    return next(new ErrorHandler(403, "Unauthorized to delete this chat"));

  await Promise.all([
    Chat.findByIdAndDelete(chatId),
    Message.deleteMany({ chat: chatId }),
  ]);

  return handleSuccessResponse(res, 200, "Chat deleted successfully");
});
