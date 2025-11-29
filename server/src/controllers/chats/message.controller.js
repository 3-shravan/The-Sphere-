import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../../config/cloudinary.js";
import ApiError from "../../core/errors/apiError.js";
import catchAsyncError from "../../middlewares/catchAsyncError.js";
import { Chat } from "../../models/chats/chat.model.js";
import { Message } from "../../models/chats/message.model.js";
import { User } from "../../models/user/user.model.js";
import { createAndSaveMessage } from "../../services/chat.services.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { content } = req.body;
  const { receiverId } = req.params;
  const { _id: senderId } = req.user;

  const image = req.file;

  if (!receiverId || (!content && !image))
    return next(new ApiError(400, "Invalid data"));

  let media = null;
  if (image) media = await uploadFile(image, `message_${uuidv4()}`, "messages");
  let chat = null;

  // SELF CHAT FLOW
  if (receiverId.toString() === senderId.toString()) {
    chat = await Chat.findOne({
      users: { $size: 1, $all: [senderId] },
      isGroupChat: false,
    });
    if (!chat) {
      chat = await Chat.create({
        users: [senderId],
        isGroupChat: false,
      });
    }
  }
  // GROUP CHAT FLOW
  if (!chat) {
    chat = await Chat.findById(receiverId);
    if (chat?.isGroupChat) {
      const isMember = chat.users.some((u) => u.equals(senderId));
      if (!isMember)
        return next(new ApiError(403, "You are not a member of this group"));

      const message = await createAndSaveMessage(
        chat._id,
        senderId,
        content,
        media
      );
      return handleSuccessResponse(res, 200, "Message sent successfully", {
        sentMessage: message,
      });
    }
  }
  // PRIVATE CHAT FLOW (receiverId as UserId)
  if (!chat) {
    const userExists = await User.exists({ _id: receiverId });
    if (!userExists) return next(new ApiError(404, "User not found"));

    chat = await Chat.findOne({
      users: { $size: 2, $all: [receiverId, senderId] },
      isGroupChat: false,
    });

    if (!chat)
      chat = await Chat.create({
        users: [senderId, receiverId],
        isGroupChat: false,
      });
  }

  if (!chat) return next(new ApiError(500, "Chat creation failed"));

  const newMessage = await createAndSaveMessage(
    chat._id,
    senderId,
    content,
    media
  );
  return handleSuccessResponse(res, 200, "Message sent successfully", {
    sentMessage: newMessage,
  });
});

export const fetchMessages = catchAsyncError(async (req, res) => {
  const { chatId } = req.params;

  const limit = parseInt(req.query.limit, 10) || 100;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit + 1)
    .populate("sender", "name profilePicture")
    .lean();

  const hasMore = messages.length > limit;
  if (hasMore) messages.pop();
  handleSuccessResponse(res, 200, "Messages fetched successfully", {
    messages,
    pagination: { page, limit, hasMore },
  });
});

export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { messageId } = req.params;
  const message = await Message.findOneAndDelete({
    _id: messageId,
    sender: req.user._id,
  }).lean();
  if (!message) return next(new ApiError(404, "Message not found"));

  await Chat.updateOne(
    { _id: message.chat, lastMessage: messageId },
    { $unset: { lastMessage: "" } }
  );
  handleSuccessResponse(res, 200, "Message deleted successfully");
});

export const fetchMessagesWithCursor = catchAsyncError(
  async (req, res, next) => {
    const { chatId } = req.params;
    if (!chatId) return next(new ApiError(400, "chatId missing"));

    const userId = req.user._id;

    // Verify chat exists and user is participant
    const chat = await Chat.findById(chatId).lean();
    if (!chat) return next(new ApiError(404, "Chat not found"));

    const isMember = chat.users.some((u) => u.equals(userId));
    if (!isMember) return next(new ApiError(403, "Access denied"));

    const limit = parseInt(req.query.limit, 10) || 20;
    const cursor = req.query.cursor || null; // cursor = message._id or message.createdAt

    const query = { chat: chatId };
    if (cursor) {
      // Fetch messages older than cursor
      query._id = { $lt: cursor }; // use $lt for descending order
    }

    // Fetch limit + 1 messages to determine hasMore
    let messages = await Message.find(query)
      .sort({ _id: -1 }) // newest first
      .limit(limit + 1)
      .populate("sender", "name profilePicture")
      .lean();

    const hasMore = messages.length > limit;
    if (hasMore) messages.pop(); // remove extra

    // Set new cursor for next fetch (last message in current batch)
    const nextCursor = hasMore ? messages[messages.length - 1]._id : null;

    handleSuccessResponse(res, 200, "Messages fetched successfully", {
      messages,
      pagination: { limit, hasMore, nextCursor },
    });
  }
);
