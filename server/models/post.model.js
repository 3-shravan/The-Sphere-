import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({

   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   caption: {
      type: String,
      default: ''
   },
   thoughts: {
      type: String,
      default: ''
   },
   media: {
      type: String,
   },
   public_id: {
      type: String,
   },
   likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }],
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
   }],
   location: {
      type: String,
      default: ''
   },
   tags: [{ type: String }],

}, { timestamps: true })


export const Post = mongoose.model('Post', postSchema)

