import catchAsyncError from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { Chat } from "../../models/chats/chat.model.js";
import { v4 as uuidv4 } from "uuid";
import { deleteFile, uploadFile } from "../../config/cloudinary.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";
import { parseArray } from "../../utils/validations.js";

export const createGroupChat = catchAsyncError(async (req, res) => {
  const { groupName, groupDescription, users: rawUsers } = req.body;
  const users = await parseArray(rawUsers);
  const groupPicture = req.file;

  if (!groupName) throw new ErrorHandler(400, "Group name is required");
  if (users.length < 2 || users.length > 49)
    throw new ErrorHandler(400, "Group must have 2 to 50 members");

  if (!users.includes(req.userId.toString())) users.push(req.userId);

  let media = { url: null, public_id: null };
  if (groupPicture)
    media = await uploadFile(
      groupPicture,
      `group_picture${uuidv4()}`,
      "Group Picture"
    );

  const groupChat = await Chat.create({
    users,
    groupName,
    groupDescription,
    groupPicture: media.url,
    groupPicturePublicId: media.public_id,
    isGroupChat: true,
    groupCreatedBy: req.userId,
    admins: [req.userId],
  });

  if (!groupChat) throw new ErrorHandler(500, "Failed to create group chat");

  await groupChat.populate([
    { path: "users", select: "name profilePicture" },
    { path: "admins", select: "name profilePicture" },
    { path: "groupCreatedBy", select: "name profilePicture" },
  ]);

  return handleSuccessResponse(res, 201, "Group chat created successfully", {
    groupChat,
  });
});

export const updateGroup = catchAsyncError(async (req, res) => {
  const { chatId } = req.params;
  const { groupName, groupDescription } = req.body;

  const group = await Chat.findById(chatId);
  if (!group) throw new ErrorHandler(404, "Group not found");
  if (!group.isGroupChat)
    throw new ErrorHandler(400, "This is not a group chat");
  if (
    group.groupName === groupName &&
    group.groupDescription === groupDescription
  )
    throw new ErrorHandler(400, "No made no changes");

  if (!group.users.includes(req.userId))
    throw new ErrorHandler(
      403,
      "You are not a member of this group.Can't make changes"
    );

  if (groupName) group.groupName = groupName;
  if (groupDescription) group.groupDescription = groupDescription;
  await group.save();
  return handleSuccessResponse(res, 200, "Group updated successfully", {
    groupName: group.groupName,
    groupDescription: group.groupDescription,
  });
});

export const changeGroupPicture = catchAsyncError(async (req, res) => {
  const { chatId } = req.params;

  const groupPicture = req.file;
  if (!groupPicture) throw new ErrorHandler(400, "Group picture is required");

  const group = await Chat.findById(chatId);
  if (!group) throw new ErrorHandler(404, "Group not found");
  if (!group.isGroupChat)
    throw new ErrorHandler(400, "This is not a group chat");

  if (!group.users.includes(req.userId))
    throw new ErrorHandler(
      403,
      "You are not an member of this group. Can't change the picture."
    );

  if (group.groupPicturePublicId) await deleteFile(group.groupPicturePublicId);

  const public_Id = `group_picture${uuidv4()}`;
  const { url, publicId } = await uploadFile(groupPicture, public_Id);

  group.groupPicture = url;
  group.groupPicturePublicId = publicId;
  await group.save();

  return handleSuccessResponse(res, 200, "Group picture updated successfully", {
    groupPicture: group.groupPicture,
  });
});

export const addToGroup = catchAsyncError(async (req, res) => {
  const { chatId } = req.params;
  const { users: rawUsers } = req.body;
  const users = await parseArray(rawUsers);

  const group = await Chat.findById(chatId);

  if (!group) throw new ErrorHandler(404, "Group not found");
  if (!group.isGroupChat)
    throw new ErrorHandler(400, "This is not a group chat");
  if (!group.admins.includes(req.userId))
    throw new ErrorHandler(403, "You are not an admin of this group");
  if (group.users.length + users.length > 50)
    throw new ErrorHandler(400, "Group can have only 50 members");

  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { users: { $each: users } } },
    { new: true }
  ).populate("users", "name email");

  return handleSuccessResponse(res, 200, "Users added to group successfully", {
    members: updatedGroup.users,
  });
});

export const removeFromGroup = catchAsyncError(async (req, res) => {
  const { chatId, userId } = req.params;
  if (!userId || !chatId)
    throw new ErrorHandler(400, "UserId and chatId are required");

  const group = await Chat.findById(chatId);
  if (!group) throw new ErrorHandler(404, "Group not found");
  if (!group.isGroupChat)
    throw new ErrorHandler(400, "This is not a group chat");
  if (!group.users.includes(req.userId))
    throw new ErrorHandler(403, "You are not a member of this group");
  if (!group.users.includes(userId))
    throw new ErrorHandler(400, "User already not a group member");
  if (group.groupCreatedBy.toString() === userId.toString())
    throw new ErrorHandler(400, "The creator of the group can't be removed");
  if (
    !group.admins.includes(req.userId) &&
    req.userId.toString() !== userId.toString()
  )
    throw new ErrorHandler(403, "Only admins can remove users from the group");
  if (group.admins.includes(userId))
    throw new ErrorHandler(400, "An admin of the group can't be removed");

  group.users = group.users.filter(
    (user) => user.toString() !== userId.toString()
  );
  await group.save();

  return handleSuccessResponse(
    res,
    200,
    "User removed from group successfully"
  );
});

export const UpdateAdmin = catchAsyncError(async (req, res) => {
  const { chatId, userId } = req.params;
  if (!userId || !chatId)
    throw new ErrorHandler(400, "UserId and chatId are required");

  const group = await Chat.findById(chatId);
  if (!group) throw new ErrorHandler(404, "Group not found");
  if (!group.isGroupChat)
    throw new ErrorHandler(400, "This is not a group chat");

  if (!group.admins.includes(req.userId))
    throw new ErrorHandler(403, "You are not an admin of this group");

  if (group.groupCreatedBy.toString() === userId.toString())
    throw new ErrorHandler(400, "Group Creator can't be removed as admin");

  let message;
  if (group.admins.includes(userId)) {
    group.admins = group.admins.filter(
      (admin) => admin.toString() !== userId.toString()
    );
    message = "User removed as admin successfully";
  } else {
    group.admins.push(userId);
    message = "User added as admin successfully";
  }
  await group.save();
  await group.populate("admins groupCreatedBy", "name profilePicture");

  const admins = [
    group.groupCreatedBy,
    ...group.admins.filter(
      (admin) => admin._id.toString() !== group.groupCreatedBy._id.toString()
    ),
  ];
  return handleSuccessResponse(res, 200, message, { admins });
});
