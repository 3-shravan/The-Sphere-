import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { Block } from "../models/block.model.js";
import { handleErrorResponse, handleSuccessResponse } from "../utils/responseHandler.js";
import { uploadImage, deleteImage } from "../config/cloudinary.js";





{/***********  
     * @Update_Profile
  *  *********** / */}
export const updateProfile = catchAsyncError(async (req, res, next) => {
   const { name, bio, gender, age } = req.body
   const userId = req.user._id
   const profilePicture = req.file

   const user = await User.findById(userId)
   if (!user) return next(new ErrorHandler(404, "User not found"));

   if (profilePicture) {
      const newPublicId = `user_${userId}_profile`;

      if (user.profilePicturePublicId) {
         await deleteImage(user.profilePicturePublicId);
      }

      const { url, publicId } = await uploadImage(profilePicture, newPublicId);
      user.profilePicture = url;
      user.profilePicturePublicId = publicId;

   }
   if (bio) user.bio = bio;
   if (gender) user.gender = gender;
   if (name) user.name = name;
   if (age) user.age = age;

   await user.save()
   handleSuccessResponse(res, 200, "Profile updated successfully", { user })

})

export const deleteProfilePicture = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id
   const user = await User.findById(userId)
   if (!user) return next(new ErrorHandler(404, "User not found"));

   if (user.profilePicturePublicId) {
      await deleteImage(user.profilePicturePublicId);
      user.profilePicture = undefined;
      user.profilePicturePublicId = undefined;
      await user.save()
   }
   handleSuccessResponse(res, 200, "Profile picture deleted successfully", { user })

})


{/***********  
     * @Get_User_Profile
  *  *********** / */}

export const getProfile = catchAsyncError(async (req, res, next) => {
   const username = req.params.username
   const requesterId = req.user._id
   if (!username) return next(new ErrorHandler(400, 'Username is required'))
   let user = await User.findOne({ name: username, accountVerified: true })
      .select('-password')
      .populate({
         path: 'posts',
         select: '-__v -updatedAt',
         options: { sort: { createdAt: -1 } }
      });
   if (!user) return next(new ErrorHandler(404, 'User not found'))



   const isBlocked = await Block.findOne({
      $or: [
         { blockerId: requesterId, blockedId: user._id },
         { blockerId: user._id, blockedId: requesterId }
      ]
   });

   if (isBlocked) {
      return next(new ErrorHandler(403, 'You cannot view this profile.'));
   }

   handleSuccessResponse(res, 200, 'Profile fetched', { user })
})


{/***********  
     * @Get_Suggested_Users
  *  *********** / */}

export const getSuggestedUsers = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id

   const blockedUsers = await Block.find({
      $or: [{ blockerId: userId }, { blockedId: userId }]
   }).select('blockedId blockerId');

   const blockedUserIds = blockedUsers.map(block =>
      block.blockerId.toString() === userId.toString() ? block.blockedId : block.blockerId
   );

   const user = await User.findOne({ _id: userId, accountVerified: true }).select('-password')
   const users = await User
      .find({ _id: { $nin: [userId, ...user.following, ...blockedUserIds] }, accountVerified: true })
      .sort({ createdAt: -1 })
      .select('-password')
      .limit(10);

   if (!users) return next(new ErrorHandler(404, 'Suggested Users are not available currently.'))
   handleSuccessResponse(res, 200, 'Suggested users fetched', { users });
})


{/***********  
     * @Delete_Account
  *  *********** / */}
export const deleteAccount = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id
   const user = await User.deleteOne({ _id: userId })
   if (!user) return next(new ErrorHandler(404, 'User not found'))
   handleSuccessResponse(res, 200, 'Account deleted', { user })
})


{/***********  
     * @Follow_Unfollow
  *  *********** / */}

export const followUnfollow = catchAsyncError(async (req, res, next) => {
   const toFollow = req.params.id;
   const followedBy = req.user._id;

   const user = await User.findById(followedBy)
   const toFollowUser = await User.findById(toFollow)

   if (!toFollowUser || !user) {
      handleErrorResponse(res, 404, 'User not found')
   }
   if (toFollowUser._id.toString() === user._id.toString()) {
      return handleErrorResponse(res, 400, 'You cannot follow yourself')
   }

   const isBlocked = await Block.findOne({
      $or: [
         { blockerId: followedBy, blockedId: toFollowUser._id },
         { blockerId: toFollowUser._id, blockedId: followedBy }
      ]
   });

   if (isBlocked) {
      return handleErrorResponse(res, 403, "You cannot follow this user");
   }

   if (user.following.includes(toFollowUser._id)) {
      user.following = user.following.filter((userId) => userId.toString() !== toFollowUser._id.toString())
      toFollowUser.followers = toFollowUser.followers.filter((userId) => userId.toString() !== user._id.toString())
      await user.save()
      await toFollowUser.save()
      return handleSuccessResponse(res, 200, 'Unfollowed successfully')
   }
   user.following.push(toFollowUser._id)
   toFollowUser.followers.push(user._id)
   await user.save()
   await toFollowUser.save()
   handleSuccessResponse(res, 200, 'Followed successfully')
})


export const getAllUsers = catchAsyncError(async (req, res, next) => {

   const userId = req.user._id;

   const blockedUsers = await Block.find({
      $or: [{ blockerId: userId }, { blockedId: userId }]
   }).select('blockedId blockerId');

   const blockedUserIds = blockedUsers.map(block =>
      block.blockerId.toString() === userId.toString() ? block.blockedId : block.blockerId
   );

   const query = req.query.search
      ? {
         _id: { $nin: [...blockedUserIds] },
         $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
         ]
      }
      : { _id: { $nin: [...blockedUserIds] } };

   const users = await User.find(query).find({ _id: { $ne: req.user._id } })
   if (!users) return next(new ErrorHandler(404, 'No users found'))
   handleSuccessResponse(res, 200, 'Users fetched successfully', { users })
}
)

export const blockUnblockUser = catchAsyncError(async (req, res, next) => {
   const blockedId = req.params.id
   const blockerId = req.user._id

   if (!blockedId) {
      return handleErrorResponse(res, 400, ' user ID is required for this opperation')
   }

   const blockedUser = await User.findById(blockedId)
   if (!blockedUser) {
      return handleErrorResponse(res, 404, 'User not found')
   }

   if (blockedId === blockerId) {
      return handleErrorResponse(res, 400, 'You cannot block yourself')
   }

   const isExistingBlock = await Block.findOne({ blockerId, blockedId })
   if (isExistingBlock) {
      await Block.deleteOne({ blockerId, blockedId })
      return handleSuccessResponse(res, 200, 'User unblocked successfully')
   }
   await Block.create({ blockerId, blockedId })

   await User.updateOne({ _id: blockerId }, { $pull: { following: blockedId, followers: blockedId } });
   await User.updateOne({ _id: blockedId }, { $pull: { following: blockerId, followers: blockerId } });


   handleSuccessResponse(res, 200, 'User blocked successfully')

})



