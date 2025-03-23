import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
   text: {
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
      // index: true,
      required: true
   },
   likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }],
   isDeleted: {
      type: Boolean,
      default: false
   },

})
// commentSchema.index({ post: 1, createdAt: -1 });

export const Comment = mongoose.model("Comment", commentSchema)