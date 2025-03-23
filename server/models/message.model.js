import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({

   // conversation: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: "Conversation",
   //    required: true,
   // },

   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   content: {
      type: String,
      required: true
   },
   systemMessage: {
      type: String,
      default: ''
   },
   isLiked: {
      type: Boolean,
      default: false
   },
   isRead: {
      type: Boolean,
      default: false
   },
   readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   deletedFor: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }]

}, { timestamps: true })

export const Message = mongoose.model('Message', messageSchema)