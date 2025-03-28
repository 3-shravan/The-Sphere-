import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";

import { Post } from "../models/post.model.js";
import { User } from "../models/userModel.js";
import { Comment } from "../models/comment.model.js";
import { createPost } from "../services/post.services.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";




{/***********  
     * @add_new_post
  *  *********** / */}
export const addNewPost = catchAsyncError(async (req, res, next) => {
   const authorId = req.user._id
   const { caption, thoughts, location, tags } = req.body
   const image = req.file

   // if (!image || !image.buffer) return next(new ErrorHandler(400, "Invalid image upload"));
   let post;
   if (image) {
      const optimizedImageBuffer = await sharp(image.buffer)
         .resize({ width: 800, height: 800, fit: "inside" })
         .toFormat('jpeg', { quality: 80 })
         .toBuffer()

      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
      const cloudResponse = await cloudinary.uploader.upload(fileUri)
      if (!cloudResponse) return next(new ErrorHandler(500, "Failed to upload image to cloudinary"))
      const media = {
         public_id: cloudResponse.public_id,
         url: cloudResponse.secure_url,
      }
      post = await createPost({ authorId, caption, thoughts, location, tags, media })
   } else {
      const media = {
         public_id: 'Not provided',
         url: 'Not provided',
      }
      post = await createPost({ authorId, caption, thoughts, location, tags, media })
   }
   if (!post) return next(new ErrorHandler(500, "Failed to create post"))

   const author = await User.findById(authorId)
   author.posts.push(post._id)
   await author.save()

   await post.populate({ path: "author", select: "name profilePicture" })
   handleSuccessResponse(res, 201, "Post created successfully", post)

})








{/***********  
     * @Get_All_Posts
  *  *********** / */}


export const getAllPosts = catchAsyncError(async (req, res, next) => {
   const posts = await Post
      .find()
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
   handleSuccessResponse(res, 200, "Posts fetched successfully", posts)

})







{/***********  
     * @Get_Own_Posts
  *  *********** / */}
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
   handleSuccessResponse(res, 200, "Posts fetched successfully", posts)

})







{/***********  
     * @Like_and_dislike_Post
  *  *********** / */}

export const likePost = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const likedBy = req.user._id

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   const isLiked = post.likes.includes(likedBy)
   if (isLiked) {
      post.likes.pull(likedBy)
      await post.save()
      return handleSuccessResponse(res, 200, "Post unliked successfully")
   }
   post.likes.push(likedBy)
   await post.save()
   handleSuccessResponse(res, 200, "Post liked successfully")

})








{/***********  
     * @Delete_Post
  *  *********** / */}

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
     * @Add_Comment_On_Post
  *  *********** / */}

export const commentPost = catchAsyncError(async (req, res, next) => {
   const { postId } = req.params
   const commentedBy = req.user._id
   const { text } = req.body
   if (!text) return next(new ErrorHandler(404, "Please enter a comment"))

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   const comment = await Comment.create({ text, author: commentedBy, post: postId })
   if (!comment) return next(new ErrorHandler(500, "Failed to create comment"))

   await comment.populate({ path: "author", select: "name , profilePicture" })
   post.comments.push(comment._id)
   await post.save()
   handleSuccessResponse(res, 200, "Comment added successfully", comment)
})



{/***********  
     * @get_post_comments
  *  *********** / */}


export const getPostComments = catchAsyncError(async (req, res, next) => {

   const { postId } = req.params

   const post = await Post.findById(postId)
   if (!post) return next(new ErrorHandler(404, "Post not found"))

   const comments = await Comment
      .find({ post: postId })
      .populate({ path: "author", select: "name , profilePicture" })
      .sort({ createdAt: -1 })

   if (!comments) return next(new ErrorHandler(404, "No comments found"))
   handleSuccessResponse(res, 200, "Comments fetched successfully", comments)

})




{/***********  
     * @delete_comment
  *  *********** / */}

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

   const posts = await Post.find({ _id: { $in: user.saved } }).populate({ path: "author", select: "name , profilePicture" })
   if (!posts) return next(new ErrorHandler(404, "No saved posts found"))

   handleSuccessResponse(res, 200, "Saved posts fetched successfully", posts)
})
