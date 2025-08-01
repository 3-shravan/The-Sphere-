import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import { deleteImage, uploadImage } from '../config/cloudinary.js';
import { Chat } from '../models/chat.model.js';
import { handleSuccessResponse } from '../utils/responseHandler.js';


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

   handleSuccessResponse(res, 201, "Group chat created successfully", { populatedGroupChat });
});


export const renameGroup = catchAsyncError(async (req, res, next) => {
   const { groupId } = req.params
   const { groupName } = req.body
   if (!groupId) return next(new ErrorHandler(400, "GroupId is required"))
   if (!groupName) return next(new ErrorHandler(400, "Group name is required"))
   const group = await Chat.findById(groupId)

   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))
   if (!group.admins.includes(req.user._id))
      return next(new ErrorHandler(403, "You are not an admin of this group"))

   group.groupName = groupName

   await group.save()
   handleSuccessResponse(res, 200, "Group name updated successfully", { groupName: group.groupName })
})


export const changeDescription = catchAsyncError(async (req, res, next) => {
   const { groupId } = req.params

   const { groupDescription } = req.body
   if (!groupId) return next(new ErrorHandler(400, "GroupId is required"))
   if (!groupDescription) return next(new ErrorHandler(400, "Group description is required"))

   const group = await Chat.findById(groupId)
   if (!group) return next(new ErrorHandler(404, "Group not found"))
   if (!group.isGroupChat) return next(new ErrorHandler(400, "This is not a group chat"))
   if (!group.admins.includes(req.user._id))
      return next(new ErrorHandler(403, "You are not an admin of this group"))
   group.groupDescription = groupDescription
   await group.save()
   handleSuccessResponse(res, 200, "Group description updated successfully", { groupDescription: group.groupDescription })

})


export const changeGroupPicture = catchAsyncError(async (req, res, next) => {
   const { groupId } = req.params
   const { groupPicture } = req.body

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

   handleSuccessResponse(res, 200, "Group picture updated successfully", { groupPicture: group.groupPicture })

})


export const addToGroup = catchAsyncError(async (req, res, next) => {
   const { groupId } = req.params
   const { users } = req.body
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
   const { groupId } = req.params
   const { userId } = req.body;

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
   const { groupId } = req.params
   const { userId } = req.body;

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
   handleSuccessResponse(res, 200, "User added as admin successfully", { admins: group.admins });

})


