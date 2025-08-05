import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import cloudinary, { deleteImage } from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Block } from "../models/block.model.js";
import { Comment } from "../models/comment.model.js";
import { createPost } from "../services/post.services.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";
import { processImageUpload } from "../services/processImageUpload.js";
import { postChanges } from "../utils/validations.js";

const isBlocked = async (userId, targetId) => {
  const blocked = await Block.findOne({
    $or: [
      { blockerId: userId, blockedId: targetId },
      { blockerId: targetId, blockedId: userId },
    ],
  });
  return !!blocked;
};

/*******************************************
 * @add_new_post
 ******************************************** / */
export const addNewPost = catchAsyncError(async (req, res, next) => {
  const authorId = req.user._id;
  const image = req.file;
  const { caption, thoughts, location } = req.body;

  let tags = [];
  try {
    tags = JSON.parse(req.body.tags || "[]");
  } catch {
    return next(new ErrorHandler(400, "Invalid tags format"));
  }

  if ((caption || location || tags) && !image && !thoughts)
    return next(new ErrorHandler(404, "Share thoughts or upload a picture"));
  if (!image && !thoughts)
    return next(new ErrorHandler(404, "Share thoughts or upload a picture"));

  const publicId = `post_${uuidv4()}`;
  const media = await processImageUpload(image, publicId, "posts", next);

  const post = await createPost({
    authorId,
    caption,
    thoughts,
    location,
    tags,
    media,
  });
  if (!post) return next(new ErrorHandler(500, "Failed to upload post"));

  const author = await User.findById(authorId);
  author.posts.push(post._id);
  await author.save();

  await post.populate({ path: "author", select: "name profilePicture" });
  handleSuccessResponse(res, 201, "Post created successfully", { post });
});

/*********************************************
 * @Update_Post
 * *******************************************/
export const updatePost = catchAsyncError(async (req, res, next) => {
  const authorId = req.user._id;
  const { postId } = req.params;
  const { caption, location } = req.body;

  if (!postId || postId === "undefined") {
    return next(new ErrorHandler(400, "Post ID is required"));
  }

  let tags = [];
  try {
    tags = JSON.parse(req.body.tags || "[]");
  } catch {
    return next(new ErrorHandler(400, "Invalid tags format"));
  }

  const post = await Post.findOne({ _id: postId, author: authorId });
  if (!post) return next(new ErrorHandler(404, "Post not found"));
  if (post.thoughts)
    return next(
      new ErrorHandler(400, "You cannot update a post with thoughts")
    );

  const { isUnchanged, isCaptionSame, isLocationSame, isTagsSame } =
    postChanges(post, { caption, location, tags });
  if (isUnchanged)
    return handleSuccessResponse(res, 200, "You made no changes.", { post });

  if (!isCaptionSame) post.caption = caption;
  if (!isLocationSame) post.location = location;
  if (!isTagsSame) post.tags = tags;

  await post.save();
  await post.populate({ path: "author", select: "name profilePicture" });

  handleSuccessResponse(res, 200, "Post updated successfully", { post });
});

/***********************************************
 * @Get_All_Posts
 * ********************************************* / */
export const getAllPosts = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const blockedUsers = await Block.find({
    $or: [{ blockerId: userId }, { blockedId: userId }],
  }).distinct("blockedId");

  const posts = await Post.find({ author: { $nin: blockedUsers } })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({ path: "author", select: "name , profilePicture" })
    .populate({ path: "likes", select: "name , profilePicture" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "name , profilePicture",
      },
    });

  if (!posts) return next(new ErrorHandler(404, "No posts found"));
  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);
  const hasMore = page * limit < totalPosts;
  const data = {
    currentPage: page,
    totalPages,
    hasMore,
    posts,
  };
  handleSuccessResponse(res, 200, "Posts fetched successfully", data);
});

/***********
 * @Get_Following_Posts
 * ***********/
export const getFollowingPosts = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const blockedUsers = await Block.find({
    $or: [{ blockerId: userId }, { blockedId: userId }],
  }).distinct("blockedId");

  const user = await User.findById(userId).select("following");
  const posts = await Post.find({
    author: { $in: user.following, $nin: blockedUsers },
  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({ path: "author", select: "name , profilePicture" })
    .populate({ path: "likes", select: "name , profilePicture" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "name , profilePicture",
      },
    });

  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);
  const hasMore = page * limit < totalPosts;
  const data = {
    currentPage: page,
    totalPages,
    hasMore,
    posts,
  };
  handleSuccessResponse(res, 200, "Posts fetched successfully", data);
});

/***********
 * @Get_Post_By_Id
 * *********** / */
export const getPostById = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId).populate({
    path: "author",
    select: "name profilePicture",
  });
  if (!post) return next(new ErrorHandler(404, "Post not found"));
  handleSuccessResponse(res, 200, "Post fetched successfully", { post });
});

/**********************************
   @Get_Own_Posts
 ************************************8*/
export const getMyPosts = catchAsyncError(async (req, res, next) => {
  const authorId = req.user._id;
  const posts = await Post.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "name , profilePicture",
    })
    .populate({
      path: "likes",
      select: "name , profilePicture",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "name , profilePicture",
      },
    });
  if (!posts) return next(new ErrorHandler(404, "No posts found"));
  handleSuccessResponse(res, 200, "Posts fetched successfully", { posts });
});

/****************************************
 * @Like_and_dislike_Post
 * ***************************************/
export const likePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const likedBy = req.user._id;

  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  // Check if user is blocked
  if (await isBlocked(likedBy, post.author)) {
    return next(new ErrorHandler(403, "You cannot like this post"));
  }
  const isLiked = post.likes.includes(likedBy);
  if (isLiked) {
    post.likes.pull(likedBy);
    await post.save();
    return handleSuccessResponse(res, 200, "Post unliked successfully");
  }
  post.likes.push(likedBy);
  await post.populate({ path: "likes", select: "name , profilePicture" });
  await post.save();
  handleSuccessResponse(res, 200, "Post liked successfully");
});

/*****************************************
 * @Delete_Post
 * **************************************** */
export const deletePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const authorID = req.user._id;

  const post = await Post.findOneAndDelete({ _id: postId, author: authorID });
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  if (post.media) await deleteImage(post.public_id);

  //remove the post from the user's posts array.
  const user = await User.findById(authorID);
  user.posts.pull(post._id);
  await user.save();
  //delete all comments related to the post.
  await Comment.deleteMany({ post: postId });
  handleSuccessResponse(res, 200, "Post deleted successfully");
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

/*********************************************
 * @Get_Saved_Posts
 *  ******************************************* / */
export const getSavedPosts = catchAsyncError(async (req, res, next) => {
  const savedBy = req.user._id;
  const user = await User.findById(savedBy);

  const savedPosts = await Post.find({ _id: { $in: user.saved } }).populate({
    path: "author",
    select: "name , profilePicture",
  });
  if (!savedPosts) return next(new ErrorHandler(404, "No saved posts found"));

  handleSuccessResponse(res, 200, "Saved posts fetched successfully", {
    savedPosts,
  });
});
