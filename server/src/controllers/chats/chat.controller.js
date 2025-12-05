import ApiError from "../../core/errors/apiError.js";
import { BAD_REQUEST } from "../../core/errors/customError.js";
import catchAsyncError from "../../middlewares/catchAsyncError.js";
import { Chat } from "../../models/chats/chat.model.js";
import { Message } from "../../models/chats/message.model.js";
import { User } from "../../models/user/user.model.js";
import { isExists } from "../../services/db.services.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";

export const connections = catchAsyncError(async (req, res) => {
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
    const isSelfChat = chat.users.length === 1;
    const otherUsers = isSelfChat
      ? chat.users
      : chat.users.filter((u) => String(u._id) !== userId);
    return {
      _id: chat._id,
      isSelfChat,
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

export const getChat = catchAsyncError(async (req, res) => {
  const { chatId } = req.params;
  const { q = "false" } = req.query;
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

  if (chat && q === "true") {
    chat.users = chat.users.filter(
      (user) => String(user._id) !== String(req.user._id)
    );
  }

  if (!chat) throw new ApiError(404, "Chat does not exist");

  if (req.query.includeMessages === "true")
    chat.messages = await Message.find({ chat: chat._id })
      .populate("sender", "name profilePicture")
      .sort({ createdAt: -1 })
      .limit(300)
      .lean();

  if (!chat.isGroupChat) {
    const {
      _groupName,
      _groupDescription,
      _groupPicture,
      _groupPicturePublicId,
      _groupCreatedBy,
      _admins,
      ...rest
    } = chat;
    handleSuccessResponse(res, 200, "Chat fetched successfully", {
      chat: rest,
    });
  } else {
    handleSuccessResponse(res, 200, "Chat fetched successfully", { chat });
  }
});

export const chatExists = catchAsyncError(async (req, res) => {
  const { userId } = req;
  const { otherUserId } = req.params;

  if (!isExists(User, { _id: otherUserId }))
    throw new BAD_REQUEST(
      "The user you are trying to chat with does not exist."
    );

  const chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [userId, otherUserId] },
  }).lean();

  return chat
    ? handleSuccessResponse(res, 200, "Chat existence checked", {
        isExists: true,
        chat,
      })
    : handleSuccessResponse(res, 200, "Chat existence checked", {
        isExists: false,
      });
});

export const getConversationUsers = catchAsyncError(async (req, res) => {
  const { userId } = req;
  const { q = "" } = req.query;
  const currentUser = await User.findById(userId).select("following");
  const chatUsers = await Chat.find({ users: userId }).distinct("users");

  const allRelatedUsers = [
    ...new Set([
      ...currentUser.following.map((id) => id.toString()),
      ...chatUsers,
    ]),
  ].filter((id) => id !== userId.toString());

  const users = await User.find({
    _id: { $in: allRelatedUsers },
    ...(q ? { name: { $regex: q, $options: "i" } } : {}),
  }).select("name fullName profilePicture");

  handleSuccessResponse(res, 200, "", { users });
});

export const deleteChat = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId).lean();
  if (!chat) return next(new ApiError(404, "Chat not found"));

  if (chat.isGroupChat)
    return next(new ApiError(400, "You can't delete a group chat"));

  const isParticipant = chat.users.some(
    (u) => u.toString() === req.user._id.toString()
  );
  if (!isParticipant)
    return next(new ApiError(403, "Unauthorized to delete this chat"));

  await Promise.all([
    Chat.findByIdAndDelete(chatId),
    Message.deleteMany({ chat: chatId }),
  ]);

  return handleSuccessResponse(res, 200, "Chat deleted successfully");
});
