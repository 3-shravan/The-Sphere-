import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "../models/post.model.js";
import { User } from "../models/userModel.js";
import { Block } from "../models/block.model.js";
import { Comment } from "../models/comment.model.js";
import { createPost } from "../services/post.services.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";
import { processImageUpload } from "../services/processImageUpload.js";
import { parseTags } from "../utils/utilities.js";
import mongoose from "mongoose";


const isBlocked = async (userId, targetId) => {
   const blocked = await Block.findOne({
      $or: [
         { blockerId: userId, blockedId: targetId },
         { blockerId: targetId, blockedId: userId }
      ]
   });
   return !!blocked;
};


{/***********  
     * @add_new_post
  *  *********** / */}
export const addNewPost = catchAsyncError(async (req, res, next) => {
   const authorId = req.user._id
   const { caption, thoughts, location } = req.body
   const tags = parseTags(req.body.tags)
   const image = req.file
   if ((caption || location || tags) && !image && !thoughts) return next(new ErrorHandler(404, 'Upload a picture'))
   if (!image && !thoughts) return next(new ErrorHandler(404, 'Share thoughts or upload a picture'))

   const publicId = `post_${uuidv4()}`;
   const media = await processImageUpload(image, publicId, 'posts', next);
   console.log(media)
   const post = await createPost({ authorId, caption, thoughts, location, tags, media });
   if (!post) return next(new ErrorHandler(500, "Failed to upload post"))

   const author = await User.findById(authorId)
   author.posts.push(post._id)
   await author.save()

   await post.populate({ path: "author", select: "name profilePicture" })
   handleSuccessResponse(res, 201, "Post created successfully", { post })

})


{/***********  
 * @Get_All_Posts
  * *********** / */}
export const getAllPosts = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id;
   const blockedUsers = await Block.find({
      $or: [{ blockerId: userId }, { blockedId: userId }]
   }).distinct("blockedId");

   const posts = await Post
      .find({ author: { $nin: blockedUsers } })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "name , profilePicture" })
      .populate({ path: "likes", select: "name , profilePicture" })
      .populate({
         path: "comments",
         sort: { createdAt: -1 },
         populate: {
            path: "author",
            select: "name , profilePicture"
         }
      })
   if (!posts) return next(new ErrorHandler(404, "No posts found"))
   handleSuccessResponse(res, 200, "Posts fetched successfully", { posts })
})


{/********
   @Get_Own_Posts
 ********/}
export const getMyPosts = catchAsyncError(async (req, res, next) => {
   const authorId = req.user._id
   const posts = await Post
      .find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
         path: "author",
         select: "name , profilePicture"
      })
      .populate({
         path: "likes",
         select: "name , profilePicture"
      })
      .populate({
         path: "comments",
         sort: { createdAt: -1 },
         populate: {
            path: "author",
            select: "name , profilePicture"
         }
      })
   if (!posts) return next(new ErrorHandler(404, "No posts found"))
   handleSuccessResponse(res, 200, "Posts fetched successfully", { posts })
})


{/***********  
   * @Like_and_dislike_Post
  * ********** */}
export const likePost = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const likedBy = req.user._id

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   // Check if user is blocked
   if (await isBlocked(likedBy, post.author)) {
      return next(new ErrorHandler(403, "You cannot like this post"));
   }
   const isLiked = post.likes.includes(likedBy)
   if (isLiked) {
      post.likes.pull(likedBy)
      await post.save()
      return handleSuccessResponse(res, 200, "Post unliked successfully")
   }
   post.likes.push(likedBy)
   await post.populate({ path: "likes", select: "name , profilePicture" })
   await post.save()
   handleSuccessResponse(res, 200, "Post liked successfully")

})

{/***********  
  * @Delete_Post
  * *********** / */}
export const deletePost = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const authorID = req.user._id

   const post = await Post.findOneAndDelete({ _id: postId, author: authorID })
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   if (post.media && post.public_id) {
      await cloudinary.uploader.destroy(post.public_id);
   }
   //remove the post from the user's posts array.
   const user = await User.findById(authorID)
   user.posts.pull(post._id)
   await user.save()
   //delete all comments related to the post.
   await Comment.deleteMany({ post: postId })
   handleSuccessResponse(res, 200, "Post deleted successfully")
})


{/***********  
* @Comment
*  ********* / */}
export const commentPost = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const commentedBy = req.user._id
   const { comment, parentId } = req.body
   if (!comment) return next(new ErrorHandler(404, "Please enter a comment"))

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   // Check if user is blocked
   if (await isBlocked(commentedBy, post.author)) {
      return next(new ErrorHandler(403, "You cannot like this post"));
   }

   const newComment =
      await Comment.create({ comment, author: commentedBy, post: postId, parentComment: parentId || null })
   if (!newComment) return next(new ErrorHandler(500, "Failed to create comment"))

   await newComment.populate({ path: "author", select: "name , profilePicture" })
   if (parentId) {
      const parentComment = await Comment.findById(parentId)
      if (!parentComment) return next(new ErrorHandler(404, "Parent comment not found"))
      parentComment.replies.push(newComment._id)
      await parentComment.save()
   } else {
      post.comments.push(newComment._id)
      await post.save()
   }
   handleSuccessResponse(res, 200, "Comment added successfully", { comment: newComment })
})

export const getPostComments = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   const comments = await Comment
      .find({ post: postId })
      .populate({ path: "author", select: "name , profilePicture" })
      .sort({ createdAt: -1 })
   if (!comments) return next(new ErrorHandler(404, "No comments found"))
   const commentTree = (comments, parentId = null) => {
      return comments.filter((comment) => String(comment.parentComment) === String(parentId))
         .map(comment => ({
            ...comment.toObject(),
            replies: commentTree(comments, comment._id)
         }))
   }
   const commentTreeData = commentTree(comments)
   handleSuccessResponse(res, 200, "Comments fetched successfully", { comments: commentTreeData })

})

export const deleteComment = catchAsyncError(async (req, res, next) => {

   const { commentId, postId } = req.params
   const authorID = req.user._id

   if (!commentId || !postId) return next(new ErrorHandler(400, "Invalid request."))

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, 'Post not found.'))

   const comment = await Comment.findById(commentId)
   if (!comment) return next(new ErrorHandler(404, "Comment not found."))

   if (comment.author.toString() !== authorID.toString()) return next(new ErrorHandler(400, "Unautorize to delete this comment."))

   await post.comments.pull(comment._id)
   await post.save()
   await comment.deleteOne()
   handleSuccessResponse(res, 200, 'Comment deleted successfully.')

})











{/***********  
     * @Save_and_unsave_Post
  *  *********** / */}
export const savePosts = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const savedBy = req.user._id

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   const user = await User.findById(savedBy);
   if (user.saved.includes(postId)) {
      user.saved.pull(postId)
      await user.save()
      return handleSuccessResponse(res, 200, "Post unsaved.")
   }
   user.saved.push(postId)
   await user.save()
   handleSuccessResponse(res, 200, "Post saved successfully")

})




{/***********  
     * @Get_Saved_Posts
  *  *********** / */}
export const getSavedPosts = catchAsyncError(async (req, res, next) => {

   const savedBy = req.user._id
   const user = await User.findById(savedBy)

   const blockedUsers = await Block.find({
      $or: [{ blockerId: savedBy }, { blockedId: savedBy }]
   }).distinct("blockedId");


   const savedPosts = await Post.find({ _id: { $in: user.saved } }).populate({ path: "author", select: "name , profilePicture" })
   if (!savedPosts) return next(new ErrorHandler(404, "No saved posts found"))

   handleSuccessResponse(res, 200, "Saved posts fetched successfully", { savedPosts })
})
