import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
   comment: {
      type: String,
      required: true
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
   },
   parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
   },
   replies: [{
      type: mongoose.Schema.Types.ObjectId,
      red: 'Comment'
   }],
   likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }],

}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)