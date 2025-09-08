import { Chat } from "../models/chats/chat.model.js";
import { Message } from "../models/chats/message.model.js";

export const createAndSaveMessage = async (
  chatId,
  senderId,
  content,
  media
) => {
  const { url = null, public_id = null } = media || {};
  const message = await Message.create({
    chat: chatId,
    sender: senderId,
    content,
    media: url,
    public_id: public_id,
  });
  await Chat.findByIdAndUpdate(chatId, {
    $set: { lastMessage: message._id, updatedAt: Date.now() },
  });
  await message.populate("sender", "name profilePicture");
  return message;
};
