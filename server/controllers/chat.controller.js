import { deleteImage, uploadImage } from '../config/cloudinary.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { handleSuccessResponse } from '../utils/responseHandler.js';



export const createOrGetChat = catchAsyncError(async (req, res, next) => {
   const { userId } = req.body
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
      })

   if (!chat) {
      const newChat = await Chat.create({
         isGroupChat: false,
         users: [req.user._id, userId]
      })

      if (!newChat) return next(new ErrorHandler(500, "Chat not created"))

      await newChat.populate('users', 'name profilePicture')
      newChat.isGroupChat = undefined
      newChat.groupName = undefined
      newChat.groupPicture = undefined
      newChat.groupPicturePublicId = undefined
      newChat.groupDescription = undefined
      newChat.groupCreatedBy = undefined
      newChat.admins = undefined
      await newChat.save()

      return handleSuccessResponse(res, 200, "Chat created successfully", newChat)
   }

   handleSuccessResponse(res, 200, "Chat fetched successfully", chat)

})






export const deleteChat = catchAsyncError(async (req, res, next) => {
   const { chatId } = req.body
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
      .populate('lastMessage', 'content sender isLiked createdAt')
      .populate('groupCreatedBy', 'name profilePicture')
      .sort({ updatedAt: -1 });

   const formattedChats = chats.map(chat => {
      const otherUsers = chat.users.filter(user => user._id.toString() !== userId.toString());
      return {
         _id: chat._id,
         isGroupChat: chat.isGroupChat,
         users: otherUsers,
         lastMessage: chat.lastMessage || null,
         lastSeen: chat.lastSeen?.filter(u => u.user.toString() !== userId.toString()) || [],
         unreadMessages: chat.unreadMessages?.filter(u => u.user.toString() !== userId.toString()) || [],
         typingUsers: chat.typingUsers?.filter(u => u.toString() !== userId.toString()) || [],
         blockedUsers: chat.blockedUsers?.filter(u => u.user.toString() !== userId.toString()) || [],
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







export const createGroupChat = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id;
   const { users, groupName, groupDescription, groupPicture } = req.body;

   if (!users || !groupName) return next(new ErrorHandler(400, "Please fill all the fields"));
   if (users.length < 2) return next(new ErrorHandler(400, "Please add at least 2 users"));
   if (users.length > 50) return next(new ErrorHandler(400, "Group can have only 50 members"));
   if (users.includes(userId)) return next(new ErrorHandler(400, "You can't add yourself to the group"));

   let url = "";
   let publicId = "";
   if (groupPicture) {
      const newPublicId = `group_${userId}_profile`;
      const uploadResult = await uploadImage(groupPicture, newPublicId);
      url = uploadResult.url;
      publicId = uploadResult.publicId;
   }

   const groupChat = await Chat.create({
      users: [...users, req.user._id],
      groupName,
      groupDescription,
      groupPicture: url,
      groupPicturePublicId: publicId,
      isGroupChat: true,
      groupCreatedBy: req.user._id,
      admins: [req.user._id],
   });

   if (!groupChat) return next(new ErrorHandler(500, "Group chat not created"));
   const populatedGroupChat = await Chat.findById(groupChat._id)
      .populate('users', 'name profilePicture')
      .populate('groupCreatedBy', 'name profilePicture')
      .populate('admins', 'name profilePicture');

   handleSuccessResponse(res, 201, "Group chat created successfully", populatedGroupChat);
});







export const renameGroup = catchAsyncError(async (req, res, next) => {

   const { groupId, groupName } = req.body
   if (!groupId) return next(new ErrorHandler(400, "GroupId is required"))
   if (!groupName) return next(new ErrorHandler(400, "Group name is required"))
   const group = await Chat.findById(groupId)

   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))
   if (!group.admins.includes(req.user._id))
      return next(new ErrorHandler(403, "You are not an admin of this group"))

   group.groupName = groupName
   await group.save()
   handleSuccessResponse(res, 200, "Group name updated successfully", group.groupName)
})






export const changeDescription = catchAsyncError(async (req, res, next) => {
   const { groupId, groupDescription } = req.body
   if (!groupId) return next(new ErrorHandler(400, "GroupId is required"))
   if (!groupDescription) return next(new ErrorHandler(400, "Group description is required"))

   const group = await Chat.findById(groupId)
   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))
   if (!group.admins.includes(req.user._id))
      return next(new ErrorHandler(403, "You are not an admin of this group"))
   group.groupDescription = groupDescription
   await group.save()
   handleSuccessResponse(res, 200, "Group description updated successfully", group.groupDescription)

})






export const changeGroupPicture = catchAsyncError(async (req, res, next) => {
   const { groupId, groupPicture } = req.body

   if (!groupId) return next(new ErrorHandler(400, "GroupId is required"))
   if (!groupPicture) return next(new ErrorHandler(400, "Group picture is required"))

   const group = await Chat.findById(groupId)
   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))

   if (group.admins.includes(req.user._id)) return next(new ErrorHandler(403, "You are not an admin of this group"))

   let url = "";
   let publicId = "";
   if (group.groupPicturePublicId) {
      await deleteImage(group.groupPicturePublicId)
   }
   const newPublicId = `group_${group._id}_profile`;
   const uploadResult = await uploadImage(groupPicture, newPublicId)
   url = uploadResult.url
   publicId = uploadResult.publicId

   group.groupPicture = url
   group.groupPicturePublicId = publicId
   await group.save()

   handleSuccessResponse(res, 200, "Group picture updated successfully", group.groupPicture)

})






export const addToGroup = catchAsyncError(async (req, res, next) => {
   const { users, groupId } = req.body
   const group = await Chat.findById(groupId)

   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))
   if (!group.admins.includes(req.user._id)) return next(new ErrorHandler(403, "You are not an admin of this group"))
   if (group.users.length + users.length > 50) return next(new ErrorHandler(400, "Group can have only 50 members"))

   group.users.push(...users)
   await group.save()
   handleSuccessResponse(res, 200, "Users added to group successfully")

})







export const removeFromGroup = catchAsyncError(async (req, res, next) => {
   const { userId, groupId } = req.body;

   if (!userId || !groupId) {
      return next(new ErrorHandler(400, "UserId and groupId are required"));
   }

   const group = await Chat.findById(groupId);
   if (!group) {
      return next(new ErrorHandler(404, "Group not found"));
   }

   if (!group.isGroupChat) {
      return next(new ErrorHandler(400, "This is not a group chat"));
   }

   if (group.groupCreatedBy.toString() === userId.toString()) {
      return next(new ErrorHandler(400, "The creator of the group can't be removed"));
   }

   if (group.admins.includes(userId)) {
      return next(new ErrorHandler(400, "An admin of the group can't be removed"));
   }

   const isUserInGroup = group.users.some(user => user.toString() === userId.toString());
   const isRequesterAdmin = group.admins.some(admin => admin.toString() === req.user._id.toString());
   const isSelfRemoval = userId.toString() === req.user._id.toString();

   if (!isUserInGroup) {
      return next(new ErrorHandler(400, "User is not in the group"));
   }

   if (!isRequesterAdmin && !isSelfRemoval) {
      return next(new ErrorHandler(403, "Only admins can remove users from the group"));
   }

   group.users = group.users.filter(user => user.toString() !== userId.toString());
   await group.save();

   handleSuccessResponse(res, 200, "User removed from group successfully");
});




export const changeAdmin = catchAsyncError(async (req, res, next) => {
   const { userId, groupId } = req.body;

   if (!userId || !groupId)
      return next(new ErrorHandler(400, "UserId and groupId are required"));

   const group = await Chat.findById(groupId)
   if (!group) return next(new ErrorHandler(404, "Group not found"));
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"));

   if (!group.admins.includes(req.user._id))
      return next(new ErrorHandler(403, "You are not an admin of this group"));

   if (group.groupCreatedBy.toString() === userId.toString())
      return next(new ErrorHanlder(400, "The creator of the group can't be removed as admin"));

   if (group.admins.includes(userId)) {
      group.admins = group.admins.filter(admin => admin.toString() !== userId.toString());
      await group.save();
      return handleSuccessResponse(res, 200, "User removed as admin successfully");
   }
   group.admins.push(userId); 
   await group.save();
   handleSuccessResponse(res, 200, "User added as admin successfully", group.admins);

})








