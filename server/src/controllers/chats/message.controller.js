import catchAsyncError from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "../../models/chats/chat.model.js";
import { User } from "../../models/user/user.model.js";
import { Message } from "../../models/chats/message.model.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";
import { createAndSaveMessage } from "../../services/chat.services.js";
import { uploadFile } from "../../config/cloudinary.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { receiverId } = req.params;
  const { content } = req.body;
  const image = req.file;
  const senderId = req.user._id;

  if (!receiverId || (!content && !image))
    return next(new ErrorHandler(400, "Invalid data"));

  let media = null;
  if (image) media = await uploadFile(image, `message_${uuidv4()}`, "messages");

  let chat = await Chat.findById(receiverId);
  if (chat) {
    // GROUP CHAT FLOW
    if (chat.isGroupChat) {
      const isMember = chat.users.some((u) => u.equals(senderId));
      if (!isMember)
        return next(
          new ErrorHandler(403, "You are not a member of this group")
        );

      const message = await createAndSaveMessage(
        chat._id,
        senderId,
        content,
        media
      );
      return handleSuccessResponse(res, 200, "Message sent successfully", {
        message,
      });
    }
  } else {
    // PRIVATE CHAT FLOW (receiverId as UserId)
    const userExists = await User.exists({ _id: receiverId });
    if (!userExists) return next(new ErrorHandler(404, "User not found"));

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

  if (!chat) return next(new ErrorHandler(500, "Chat creation failed"));
  const newMessage = await createAndSaveMessage(
    chat._id,
    senderId,
    content,
    media
  );
  return handleSuccessResponse(res, 200, "Message sent successfully", {
    message: newMessage,
  });
});

export const fetchMessages = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;

  const limit = parseInt(req.query.limit, 10) || 50;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit + 1)
    .populate("sender", "name profilePicture")
    .lean();
  if (!messages.length) return next(new ErrorHandler(404, "No messages found"));
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
  if (!message) return next(new ErrorHandler(404, "Message not found"));

  await Chat.updateOne(
    { _id: message.chat, lastMessage: messageId },
    { $unset: { lastMessage: "" } }
  );
  handleSuccessResponse(res, 200, "Message deleted successfully");
});

export const fetchMessagesWithCursor = catchAsyncError(
  async (req, res, next) => {
    const { chatId } = req.params;
    if (!chatId) return next(new ErrorHandler(400, "chatId missing"));

    const userId = req.user._id;

    // Verify chat exists and user is participant
    const chat = await Chat.findById(chatId).lean();
    if (!chat) return next(new ErrorHandler(404, "Chat not found"));

    const isMember = chat.users.some((u) => u.equals(userId));
    if (!isMember) return next(new ErrorHandler(403, "Access denied"));

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
