import catchAsyncError from "../../middlewares/catchAsyncError.js"
import ErrorHandler from "../../middlewares/errorHandler.js"
import { Comment } from "../../models/feed/comment.model.js"
import { Post } from "../../models/feed/post.model.js"
import { sendNotification } from "../../sockets/emit.js"
import { handleSuccessResponse } from "../../utils/responseHandler.js"

export const getPostComments = catchAsyncError(async (req, res, next) => {
  const { postId } = req.params
  const post = await Post.findById(postId)
  if (!post) return next(new ErrorHandler(404, "Post not found"))

  const comments = await Comment.find({ post: postId })
    .populate({ path: "author", select: "name , profilePicture" })
    .sort({ createdAt: -1 })
  if (!comments) return next(new ErrorHandler(404, "No comments found"))

  const commentTree = (comments, parentId = null) => {
    return comments
      .filter((comment) => String(comment.parentComment) === String(parentId))
      .map((comment) => ({
        ...comment.toObject(),
        replies: commentTree(comments, comment._id),
      }))
  }
  const commentTreeData = commentTree(comments)
  handleSuccessResponse(res, 200, "Comments fetched successfully", {
    comments: commentTreeData,
  })
})

export const commentPost = catchAsyncError(async (req, res, next) => {
  const commentedBy = req.user._id
  const { postId } = req.params
  const { comment, parentId } = req.body
  if (!comment) throw new ErrorHandler(404, "Please enter a comment")

  const post = await Post.findById(postId)
  if (!post) throw new ErrorHandler(404, "Post not found")

  // if (await userBLocked(commentedBy, post.author)) {
  //   return next(new ErrorHandler(403, "You cannot comment on this post"));

  const newComment = await Comment.create({
    comment,
    author: commentedBy,
    post: postId,
    parentComment: parentId || null,
  })
  if (!newComment) return next(new ErrorHandler(500, "Failed to create comment"))

  await newComment.populate({
    path: "author",
    select: "name , profilePicture",
  })
  if (parentId) {
    const parentComment = await Comment.findById(parentId).populate({
      path: "author",
      select: "name  profilePicture",
    })
    if (!parentComment) return next(new ErrorHandler(404, "Parent comment not found"))

    parentComment.replies.push(newComment._id)
    await parentComment.save()

    // 🚀🚀🚀 notify reply
    if (String(parentComment.author._id) !== String(commentedBy)) {
      sendNotification(String(parentComment.author._id), {
        type: "reply",
        isReply: true,
        user: {
          name: newComment.author.name,
          profilePicture: newComment.author.profilePicture,
        },
        parent: {
          name: parentComment.author.name,
          profilePicture: parentComment.author.profilePicture,
        },
        postId,
        media: post.media,
        comment: newComment.comment,
        message: `${newComment.author.name} replied ${newComment.comment}`,
      })
    }
  } else {
    post.comments.push(newComment._id)
    await post.save()
    // 🚀🚀🚀 notify  comment
    if (post.author.toString() !== commentedBy.toString()) {
      sendNotification(post.author, {
        type: "comment",
        isReply: false,
        user: {
          name: newComment.author.name,
          profilePicture: newComment.author.profilePicture,
        },
        postId,
        media: post.media,
        comment: newComment.comment,
        message: `${newComment.author.name} commented  ${newComment.comment}`,
      })
    }
  }
  handleSuccessResponse(res, 200, "Comment added successfully", {
    comment: newComment,
  })
})

export const deleteComment = catchAsyncError(async (req, res, next) => {
  const { commentId, postId } = req.params
  const authorID = req.user._id

  const post = await Post.findById(postId)
  if (!post) return next(new ErrorHandler(404, "Post not found."))

  const comment = await Comment.findById(commentId)
  if (!comment) return next(new ErrorHandler(404, "Comment not found."))

  if (comment.author.toString() !== authorID.toString())
    return next(new ErrorHandler(400, "Unautorize to delete this comment."))

  const deleteCommentAndReplies = async (id) => {
    const c = await Comment.findById(id)
    if (!c) return
    for (const replyId of c.replies) {
      await deleteCommentAndReplies(replyId)
    }
    await Comment.findByIdAndDelete(id)
  }

  await deleteCommentAndReplies(commentId)
  await Post.findByIdAndUpdate(postId, { $pull: { comments: comment._id } })

  handleSuccessResponse(res, 200, "Comment deleted successfully.")
})
