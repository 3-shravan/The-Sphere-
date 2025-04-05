import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { handleSuccessResponse } from '../utils/responseHandler.js';



export const getChat = catchAsyncError(async (req, res, next) => {
   const { userId } = req.params

   if (!userId) return next(new ErrorHandler(404, "UserId param missing"))

   const chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [userId, req.user._id] }
   }).populate('users', 'name profilePicture ')
      .populate({
         path: 'lastMessage',
         populate: ({
            path: 'sender',
            select: 'name profilePicture',
         })
      }).sort({ updatedAt: -1 })

   if (!chat) return next(new ErrorHandler(404, "Chat do not exist"))

   let chatData = chat.toObject();
   if (req.query.includeMessages === 'true') {

      const messages = await Message.find({ chat: chat._id })
         .populate('sender', 'name profilePicture')
         .sort({ createdAt: -1 })
      chatData.messages = messages;
   }
   handleSuccessResponse(res, 200, "Chat fetched successfully", chatData)

})






export const deleteChat = catchAsyncError(async (req, res, next) => {
   const { chatId } = req.params
   if (!chatId) return next(new ErrorHandler(404, "ChatId param missing"))

   const chat = await Chat.findById(chatId)
   if (!chat) return next(new ErrorHandler(404, "Chat not found"))

   if (chat.isGroupChat) return next(new ErrorHandler(400, "You can't delete a group chat"))

   if (!chat.users.includes(req.user._id)) {
      return next(new ErrorHandler(403, "Unauthorized to delete this chat"));
   }
   await Chat.findByIdAndDelete(chatId);
   await Message.deleteMany({ chat: chatId })

   return handleSuccessResponse(res, 200, "Chat deleted successfully");
})






export const connections = catchAsyncError(async (req, res, next) => {

   const userId = req.user._id;
   const chats = await Chat.find({ users: userId })
      .populate('users', 'name profilePicture')
      .populate({
         path: 'lastMessage',
         select: 'content sender isLiked createdAt',
         populate: {
            path: 'sender',
            select: 'name profilePicture'
         }
      })
      .populate('admins', 'name profilePicture')
      .populate('groupCreatedBy', 'name profilePicture')
      .sort({ updatedAt: -1 });

   const formattedChats = chats.map(chat => {
      const otherUsers = chat.users.filter(user => user._id.toString() !== userId.toString());
      return {
         _id: chat._id,
         isGroupChat: chat.isGroupChat,
         users: otherUsers,
         lastMessage: chat.lastMessage || null,
         // lastSeen: chat.lastSeen?.filter(u => u.user.toString() !== userId.toString()) || [],
         // unreadMessages: chat.unreadMessages?.filter(u => u.user.toString() !== userId.toString()) || [],
         updatedAt: chat.updatedAt,

         ...(chat.isGroupChat && {
            groupName: chat.groupName,
            groupPicture: chat.groupPicture,
            groupDescription: chat.groupDescription,
            admins: chat.admins,
            groupCreatedBy: chat.groupCreatedBy,
         })
      };
   });

   handleSuccessResponse(res, 200, "Chats fetched successfully", formattedChats);

});










