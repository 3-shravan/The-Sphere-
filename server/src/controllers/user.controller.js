import { v4 as uuidv4 } from "uuid";
import { deleteFile, uploadFile } from "../config/cloudinary.js";
import ApiError from "../core/errors/apiError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Block } from "../models/user/block.model.js";
import { User } from "../models/user/user.model.js";
import { blockedUsers } from "../services/block.services.js";
import { sendNotification } from "../sockets/emitters/notifications.emit.js";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../utils/responseHandler.js";
import { isAtLeast13YearsOld, profileChanges } from "../utils/validations.js";

export const getAllUsers = catchAsyncError(async (req, res) => {
  const userId = req.user._id;
  const blockedUserIds = await blockedUsers(userId);
  const query = req.query.search
    ? {
        _id: { $nin: [...blockedUserIds] },
        accountVerified: true,
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : { _id: { $nin: [...blockedUserIds] } };

  const users = await User.find(query)
    // .find({ _id: { $ne: userId } })
    .select("name profilePicture followers following dob")
    .limit(20)
    .sort({ createdAt: -1 });

  return handleSuccessResponse(res, 200, "Users fetched successfully", {
    users,
  });
});

// export const getSuggestedUsers = catchAsyncError(async (req, res) => {
//   const userId = req.user._id;
//   // const blockedUserIds = await blockedUsers(userId);
//   const user = await User.findOne({
//     _id: userId,
//     accountVerified: true,
//   }).select("-password");

//   const users = await User.find({
//     _id: { $nin: [userId, ...user.following] }, //add -> ,...blockedUserIds
//     accountVerified: true,
//   })
//     .sort({ createdAt: -1 })
//     .select("-password")
//     .limit(20);

//   if (!users)
//     throw new ApiError(404, "Suggested Users are not available currently.");
//   return handleSuccessResponse(res, 200, "Suggested users fetched", { users });
// });

export const getSuggestedUsers = catchAsyncError(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("following").lean();

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const followingIds = user.following || [];

  // -----------------------------
  // 🧠 STEP 1: Mutual connections pipeline
  // -----------------------------
  const mutualSuggestions = await User.aggregate([
    {
      $match: {
        _id: { $in: followingIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "theirFollowings",
      },
    },
    { $unwind: "$theirFollowings" },
    {
      $group: {
        _id: "$theirFollowings._id",
        score: { $sum: 1 }, // mutual follow count
      },
    },
    {
      $match: {
        _id: { $nin: [...followingIds, userId] }, // remove already-followed and self
      },
    },
    { $sort: { score: -1 } },
    { $limit: 20 },
  ]);

  const mutualIds = mutualSuggestions.map((u) => u._id);

  const mutualUsers = await User.find({
    _id: { $in: mutualIds },
    accountVerified: true,
  })
    .select("-password")
    .lean();

  // -----------------------------
  // 🟦 STEP 2: Fallback Suggestions (fresh users, not followed)
  // -----------------------------
  const fallbackUsers = await User.find({
    _id: { $nin: [...followingIds, userId, ...mutualIds] },
    accountVerified: true,
  })
    .sort({ createdAt: -1 })
    .select("-password")
    .limit(10)
    .lean();

  // -----------------------------
  // FINAL RESPONSE
  // -----------------------------
  const suggestions = [...mutualUsers, ...fallbackUsers];

  if (!suggestions.length) {
    throw new ApiError(404, "Suggested users are not available currently.");
  }

  return handleSuccessResponse(res, 200, "Suggested users fetched", {
    users: suggestions,
  });
});

export const myProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate([
      {
        path: "posts",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "author", select: "name profilePicture" },
          { path: "likes", select: "name profilePicture" },
        ],
      },
      {
        path: "followers following",
        select: "name profilePicture",
      },
    ]);
  if (!user) throw new ApiError(404, "error while getting your profile");
  return handleSuccessResponse(res, 200, "Profile fetched", { user });
});

export const getProfiles = catchAsyncError(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ name: username, accountVerified: true })
    .select("-password")
    .populate([
      {
        path: "posts",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "author", select: "name profilePicture" },
          { path: "likes", select: "name profilePicture" },
        ],
      },
      {
        path: "followers following",
        select: "name profilePicture",
      },
    ]);
  // if (userBlocked(req.user._id, user._id))
  //   throw new ApiError(403, "You cannot view this profile");

  if (!user) throw new ApiError(404, "User not found");
  return handleSuccessResponse(res, 200, "Profile fetched", { user });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { name, fullName, bio, gender, dob: birthday } = req.body;

  const profilePicture = req.file;
  const dob = birthday ? new Date(birthday) : null;

  if (dob && !isAtLeast13YearsOld(dob))
    return next(new ApiError(400, "You must be at least 13 years old."));

  const user = await User.findById(userId);
  if (!user) return next(new ApiError(404, "User not found"));

  const {
    isUnchanged,
    isNameSame,
    isFullNameSame,
    isBioSame,
    isGenderSame,
    isDobSame,
  } = profileChanges(
    user,
    { name, fullName, bio, gender, dob: birthday },
    !!profilePicture
  );

  if (isUnchanged)
    return handleSuccessResponse(res, 200, "No changes were made", { user });

  if (profilePicture) {
    if (user.profilePicturePublicId)
      await deleteFile(user.profilePicturePublicId);

    const { url, publicId } = await uploadFile(
      profilePicture,
      `avatar_${uuidv4()}`,
      "avatars"
    );
    if (!url || !publicId)
      return next(new ApiError(500, "Failed to upload profile picture"));
    user.profilePicture = url;
    user.profilePicturePublicId = publicId;
  }

  if (!isNameSame) user.name = name.trim();
  if (!isFullNameSame) user.fullName = fullName.trim();
  if (!isBioSame) user.bio = bio.trim();
  if (!isGenderSame) user.gender = gender;
  if (dob instanceof Date && !isDobSame) user.dob = dob;
  await user.save();
  return handleSuccessResponse(res, 200, "Profile updated successfully", {
    user,
  });
});

export const followUnfollow = catchAsyncError(async (req, res) => {
  const toFollow = req.params.id;
  const followedBy = req.user._id;

  const user = await User.findById(followedBy);
  const toFollowUser = await User.findById(toFollow);

  if (!toFollowUser || !user) handleErrorResponse(res, 404, "User not found");
  if (toFollowUser._id.toString() === user._id.toString())
    return handleErrorResponse(res, 400, "You cannot follow yourself");

  // if (userBlocked(followedBy, toFollowUser._id))
  //   return handleErrorResponse(res, 403, "You cannot follow this user");

  if (user.following.includes(toFollowUser._id)) {
    user.following = user.following.filter(
      (userId) => userId.toString() !== toFollowUser._id.toString()
    );
    toFollowUser.followers = toFollowUser.followers.filter(
      (userId) => userId.toString() !== user._id.toString()
    );
    await User.findByIdAndUpdate(user._id, {
      $pull: { following: toFollowUser._id },
    });
    await User.findByIdAndUpdate(toFollowUser._id, {
      $pull: { followers: user._id },
    });

    return handleSuccessResponse(res, 200, "Unfollowed successfully");
  }
  await User.findByIdAndUpdate(user._id, {
    $push: { following: toFollowUser._id },
  });
  await User.findByIdAndUpdate(toFollowUser._id, {
    $push: { followers: user._id },
  });

  sendNotification(toFollowUser._id, {
    type: "follow",
    user: {
      name: user.name,
      profilePicture: user.profilePicture,
    },
    message: `${user.name} started following you 🗽`,
  });
  handleSuccessResponse(res, 200, "Followed successfully");
});

export const deleteProfilePicture = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(404, "User not found"));
  if (!user.profilePicturePublicId)
    return next(new ApiError(400, "No profile picture to delete"));

  try {
    const result = await deleteFile(user.profilePicturePublicId);
    user.profilePicture = undefined;
    user.profilePicturePublicId = undefined;
    await user.save();
    return handleSuccessResponse(
      res,
      200,
      result || "Profile picture removed.",
      { user }
    );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to delete profile picture"
    );
  }
});

export const deleteAccount = catchAsyncError(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  if (!user) throw new ApiError(404, "User not found");
  return handleSuccessResponse(res, 200, "Account deleted", { user });
});

export const blockUnblockUser = catchAsyncError(async (req, res) => {
  const blockedId = req.params.id;
  const blockerId = req.user._id;

  if (!blockedId)
    return handleErrorResponse(
      res,
      400,
      " user ID is required for this opperation"
    );

  const blockedUser = await User.findById(blockedId);
  if (!blockedUser) return handleErrorResponse(res, 404, "User not found");

  if (blockedId === blockerId)
    return handleErrorResponse(res, 400, "You cannot block yourself");

  const isExistingBlock = await Block.findOne({ blockerId, blockedId });
  if (isExistingBlock) {
    await Block.deleteOne({ blockerId, blockedId });
    return handleSuccessResponse(res, 200, "User unblocked successfully");
  }
  await Block.create({ blockerId, blockedId });

  await User.updateOne(
    { _id: blockerId },
    { $pull: { following: blockedId, followers: blockedId } }
  );
  await User.updateOne(
    { _id: blockedId },
    { $pull: { following: blockerId, followers: blockerId } }
  );
  return handleSuccessResponse(res, 200, "User blocked successfully");
});

export const todayBirthdays = catchAsyncError(async (_req, res) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const users = await User.aggregate([
    {
      $addFields: {
        dobDay: { $dayOfMonth: "$dob" },
        dobMonth: { $month: "$dob" },
      },
    },
    {
      $match: {
        dobDay: day,
        dobMonth: month,
        accountVerified: true,
      },
    },
  ]).project("_id name profilePicture dob");

  return handleSuccessResponse(res, 200, "Today's Birthdays", { users });
});
