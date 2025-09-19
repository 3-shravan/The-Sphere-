import catchAsyncError from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { deleteFile, uploadFile } from "../../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../../models/feed/post.model.js";
import { User } from "../../models/user/user.model.js";
import { Comment } from "../../models/feed/comment.model.js";
import { handleSuccessResponse } from "../../utils/responseHandler.js";
import { parseArray, postChanges } from "../../utils/validations.js";
import {
  blockedUsersDistinct,
  userBlocked,
} from "../../services/block.services.js";
import { sendNotification } from "../../sockets/emit.js";

/**************************************
 * Common Helpers
 **************************************/
const POST_POPULATE = [
  { path: "author", select: "name profilePicture" },
  { path: "likes", select: "name profilePicture" },
  {
    path: "comments",
    options: { sort: { createdAt: -1 } },
    populate: { path: "author", select: "name profilePicture" },
  },
];
const paginateQuery = async (model, query, page, limit, populate = []) => {
  const [posts, totalPosts] = await Promise.all([
    model
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populate),
    model.countDocuments(query),
  ]);
  return {
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
    hasMore: page * limit < totalPosts,
    posts,
  };
};

/***********************************************
 * @Get_All_Posts
 * ********************************************* / */
export const getAllPosts = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const getBlockedUsers = await blockedUsersDistinct(userId);

  const data = await paginateQuery(
    Post,
    { author: { $nin: getBlockedUsers } },
    parseInt(page),
    parseInt(limit),
    POST_POPULATE
  );
  return handleSuccessResponse(res, 200, "Posts fetched successfully", data);
});
/****************************
 * @Get_Following_Posts
 * ******************************/
export const getFollowingPosts = catchAsyncError(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  const getBlockedUsers = await blockedUsersDistinct(userId);

  const user = await User.findById(userId).select("following");
  const data = await paginateQuery(
    Post,
    { author: { $in: user.following, $nin: getBlockedUsers } },
    parseInt(page),
    parseInt(limit),
    POST_POPULATE
  );
  if (!data.posts.length) return next(new ErrorHandler(404, "No posts found"));
  return handleSuccessResponse(res, 200, "Posts fetched successfully", data);
});

/*********************************************
 * @Get_Saved_Posts
 *  ******************************************* / */
export const getSavedPosts = catchAsyncError(async (req, res, next) => {
  const savedBy = req.user._id;
  const user = await User.findById(savedBy);
  const savedPosts = await Post.find({ _id: { $in: user.saved } })
    .populate({
      path: "author",
      select: "name , profilePicture",
    })
    .sort({ createdAt: -1 })
    .limit(100);
  if (!savedPosts) return next(new ErrorHandler(404, "No saved posts found"));
  return handleSuccessResponse(res, 200, "Saved posts fetched successfully", {
    savedPosts,
  });
});

/**********************************
   @Get_Own_Posts
 ************************************8*/
export const getMyPosts = catchAsyncError(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await paginateQuery(
    Post,
    { author: req.user._id },
    parseInt(page),
    parseInt(limit),
    POST_POPULATE
  );
  if (!data.posts.length) return next(new ErrorHandler(404, "No posts found"));
  return handleSuccessResponse(res, 200, "Your posts fetched successfully", {
    data,
  });
});

/**********************
 * @Get_Post_By_Id
 * ******************** / */
export const getPostById = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req?.user?._id;

  const post = await Post.findById(postId).populate([
    { path: "author", select: "name profilePicture" },
    { path: "likes", select: "name profilePicture" },
  ]);
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  const isSaved = await User.exists({ _id: userId, saved: postId });
  return handleSuccessResponse(res, 200, "Post fetched successfully", {
    post: { ...post.toObject(), isSaved: !!isSaved },
  });
});

/****************************************
 * @Create_Thought_Post
 * ***************************************/
export const createThoughtPost = catchAsyncError(async (req, res, next) => {
  const { thoughts } = req.body;
  const authorId = req.user._id;
  const post = await Post.create({
    author: authorId,
    postType: "thought",
    thoughts,
  });
  await User.findByIdAndUpdate(authorId, { $push: { posts: post._id } });
  await post.populate({ path: "author", select: "name profilePicture" });
  return handleSuccessResponse(res, 201, "Thought shared successfully", {
    post,
  });
});
/*******************************************
 * @add_new_post
 ******************************************** / */
export const addNewPost = catchAsyncError(async (req, res, next) => {
  const authorId = req.user._id;
  const { caption, location, tags: rawTags } = req.body;
  const tags = await parseArray(rawTags);

  const image = req.file;
  if (!image) return next(new ErrorHandler(400, "Image is required for post"));

  const media = await uploadFile(image, `post_${uuidv4()}`, "posts");
  const post = await Post.create({
    author: authorId,
    caption,
    location,
    tags,
    media: media.url,
    public_id: media.public_id,
    thoughts: null,
  });
  if (!post) return next(new ErrorHandler(500, "Failed to upload post"));

  await User.findByIdAndUpdate(authorId, { $push: { posts: post._id } });
  await post.populate({ path: "author", select: "name profilePicture" });
  return handleSuccessResponse(res, 201, "Post created successfully", { post });
});

/*********************************************
 * @Update_Post
 * *******************************************/
export const updatePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const { caption, location, tags: rawTags } = req.body;
  const tags = await parseArray(rawTags);

  const post = await Post.findOne({ _id: postId, author: req.user._id });
  if (!post) return next(new ErrorHandler(404, "Post not found"));
  if (post.thoughts)
    throw new ErrorHandler(400, "You cannot update a post with thoughts");

  const { isUnchanged, isCaptionSame, isLocationSame, isTagsSame } =
    postChanges(post, { caption, location, tags });
  if (isUnchanged)
    return handleSuccessResponse(res, 200, "You made no changes.", { post });

  if (!isCaptionSame) post.caption = caption;
  if (!isLocationSame) post.location = location;
  if (!isTagsSame) post.tags = tags;

  await post.save();
  await post.populate({ path: "author", select: "name profilePicture" });

  return handleSuccessResponse(res, 200, "Post updated successfully", { post });
});

/****************************************
 * @Like_and_dislike_Post
 * ***************************************/
export const likePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const likedBy = req.user._id;

  const post = await Post.findById(postId).populate({
    path: "author",
    select: "name profilePicture",
  });
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  // check block status
  // if (await userBlocked(likedBy, post.author._id))
  //   return next(new ErrorHandler(403, "You cannot like this post"));

  const isLiked = post.likes.includes(likedBy);

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, { $pull: { likes: likedBy } });
    return handleSuccessResponse(res, 200, "Post unliked successfully");
  }

  await Post.findByIdAndUpdate(postId, { $addToSet: { likes: likedBy } });

  // get user who liked
  const likedByUser = await User.findById(likedBy).select(
    "name profilePicture"
  );

  if (post.author._id.toString() !== likedBy.toString()) {
    sendNotification(post.author._id, {
      type: "like",
      user: {
        name: likedByUser.name,
        profilePicture: likedByUser.profilePicture,
      },
      postId,
      media: post.media,
      message: `${likedByUser.name} liked your post ❤️`,
    });
  }

  handleSuccessResponse(res, 200, "Post liked successfully");
});

/************************************
 * @Save_and_unsave_Post
 *  ******************************** / */
export const savePosts = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const savedBy = req.user._id;

  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  const user = await User.findById(savedBy);

  if (user.saved.includes(postId)) {
    user.saved.pull(postId);
    await user.save();
    return handleSuccessResponse(res, 200, "Post unsaved.");
  }
  user.saved.push(postId);
  await user.save();
  handleSuccessResponse(res, 200, "Post saved successfully");
});

/*****************************************
 * @Delete_Post
 * **************************************** */
export const deletePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const authorID = req.user._id;

  const post = await Post.findOneAndDelete({ _id: postId, author: authorID });
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  if (post.media) await deleteFile(post.public_id);

  await Promise.all([
    User.findByIdAndUpdate(authorID, { $pull: { posts: post._id } }),
    Comment.deleteMany({ post: postId }),
  ]);
  return handleSuccessResponse(res, 200, "Post deleted successfully");
});
