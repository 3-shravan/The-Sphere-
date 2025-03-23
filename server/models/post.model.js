import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({

   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   caption: {
      type: String,
      default: ''
   },
   media: [{
      type: String,
      required: true,
   }],
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
   isDeleted: {
      type: Boolean,
      default: false
   },
   isShared: {
      type: Boolean,
      default: false
   },
   sharedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
   }],
   sharedWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }],
}, { timestamps: true })


export const Post = mongoose.model('Post', postSchema)

