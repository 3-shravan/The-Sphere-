import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";

export const commentPost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const commentedBy = req.user._id;
  const { comment, parentId } = req.body;
  if (!comment) return next(new ErrorHandler(404, "Please enter a comment"));

  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  // Check if user is blocked
  if (await isBlocked(commentedBy, post.author)) {
    return next(new ErrorHandler(403, "You cannot like this post"));
  }

  const newComment = await Comment.create({
    comment,
    author: commentedBy,
    post: postId,
    parentComment: parentId || null,
  });
  if (!newComment)
    return next(new ErrorHandler(500, "Failed to create comment"));

  await newComment.populate({
    path: "author",
    select: "name , profilePicture",
  });
  if (parentId) {
    const parentComment = await Comment.findById(parentId);
    if (!parentComment)
      return next(new ErrorHandler(404, "Parent comment not found"));
    parentComment.replies.push(newComment._id);
    await parentComment.save();
  } else {
    post.comments.push(newComment._id);
    await post.save();
  }
  handleSuccessResponse(res, 200, "Comment added successfully", {
    comment: newComment,
  });
});
export const getPostComments = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler(404, "Post not found"));

  const comments = await Comment.find({ post: postId })
    .populate({ path: "author", select: "name , profilePicture" })
    .sort({ createdAt: -1 });
  if (!comments) return next(new ErrorHandler(404, "No comments found"));
  const commentTree = (comments, parentId = null) => {
    return comments
      .filter((comment) => String(comment.parentComment) === String(parentId))
      .map((comment) => ({
        ...comment.toObject(),
        replies: commentTree(comments, comment._id),
      }));
  };
  const commentTreeData = commentTree(comments);
  handleSuccessResponse(res, 200, "Comments fetched successfully", {
    comments: commentTreeData,
  });
});
export const deleteComment = catchAsyncError(async (req, res, next) => {
  const { commentId, postId } = req.params;
  const authorID = req.user._id;

  if (!commentId || !postId)
    return next(new ErrorHandler(400, "Invalid request."));

  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler(404, "Post not found."));

  const comment = await Comment.findById(commentId);
  if (!comment) return next(new ErrorHandler(404, "Comment not found."));

  if (comment.author.toString() !== authorID.toString())
    return next(new ErrorHandler(400, "Unautorize to delete this comment."));

  await post.comments.pull(comment._id);
  await post.save();
  await comment.deleteOne();
  handleSuccessResponse(res, 200, "Comment deleted successfully.");
});
