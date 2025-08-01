import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { Chat } from "../models/chat.model.js";
import { Block } from "../models/block.model.js";
import { Message } from "../models/message.model.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { receiverId } = req.params;
  const { content, media } = req.body;
  if (!receiverId || (!content && !media))
    return next(new ErrorHandler(400, "Invalid data"));

  let chat = await Chat.findOne({ _id: receiverId });

  if (chat && chat.isGroupChat) {
    if (!chat.users.includes(req.user._id))
      return next(
        new ErrorHandler(400, "You are not a member of this group chat")
      );

    const message = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      content,
      media,
    });
    chat.lastMessage = message._id;
    await chat.save();
    await message.populate("sender", "name profilePicture");
    return handleSuccessResponse(res, 200, "Message sent successfully", {
      message,
    });
  }

  const isBlocked = await Block.findOne({
    $or: [
      { blockerId: req.user._id, blockedId: receiverId },
      { blockerId: receiverId, blockedId: req.user._id },
    ],
  });

  if (isBlocked) {
    if (isBlocked.blockerId.toString() === req.user._id)
      return next(new ErrorHandler(400, "You blocked this user"));
    if (isBlocked.blockerId.toString() === receiverId)
      return next(new ErrorHandler(400, "This user blocked you"));
  }

  if (!receiverId || !req.user._id) {
    return next(new ErrorHandler(400, "Invalid user IDs"));
  }

  chat = await Chat.findOne({
    users: { $size: 2, $all: [receiverId, req.user._id] },
  });

  if (!chat) {
    chat = await Chat.create({
      users: [req.user._id, receiverId],
    });
    chat.isGroupChat = undefined;
    chat.groupName = undefined;
    chat.groupPicture = undefined;
    chat.groupPicturePublicId = undefined;
    chat.groupDescription = undefined;
    chat.groupCreatedBy = undefined;
    chat.admins = undefined;
    await chat.save();
  }
  const newMessage = await Message.create({
    chat: chat._id,
    sender: req.user._id,
    content,
    media,
  });

  chat.lastMessage = newMessage._id;
  await chat.save();

  await newMessage.populate("sender", "name profilePicture");
  handleSuccessResponse(res, 200, "Message sent successfully", { newMessage });
});

export const fetchMessages = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;
  if (!chatId) return next(new ErrorHandler(400, "Req params missing"));

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name profilePicture")
    .sort({ createdAt: -1 });
  if (!messages) return next(new ErrorHandler(404, "No messages found"));

  handleSuccessResponse(res, 200, "Messages fetched successfully", {
    messages,
  });
});

export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { messageId } = req.params;
  if (!messageId) return next(new ErrorHandler(400, "Req params missing"));

  const message = await Message.findOneAndDelete({
    _id: messageId,
    sender: req.user._id,
  });
  if (!message) return next(new ErrorHandler(404, "Message not found"));
  handleSuccessResponse(res, 200, "Message deleted successfully", { message });
});
