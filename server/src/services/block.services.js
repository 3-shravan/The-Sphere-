import { Block } from "../models/user/block.model.js";
export const userBlocked = async (requesterId, user) => {
  const isBlocked = await Block.findOne({
    $or: [
      { blockerId: requesterId, blockedId: user },
      { blockerId: user, blockedId: requesterId },
    ],
  });
  return isBlocked;
};

export const blockedUsers = async (requesterId) => {
  const blockedUsers = await Block.find({
    $or: [{ blockerId: requesterId }, { blockedId: requesterId }],
  }).select("blockedId blockerId");

  const blockedUserIds = blockedUsers.map((block) =>
    block.blockerId.toString() === requesterId.toString()
      ? block.blockedId
      : block.blockerId
  );
  return blockedUserIds;
};
export const blockedUsersDistinct = async (userId) => {
  return await Block.find({
    $or: [{ blockerId: userId }, { blockedId: userId }],
  }).distinct("blockedId");
};

// if (isBlocked) {
//   if (isBlocked.blockerId.toString() === req.user._id)
//     return next(new ErrorHandler(400, "You blocked this user"));
//   if (isBlocked.blockerId.toString() === receiverId)
//     return next(new ErrorHandler(400, "This user blocked you"));
// }
