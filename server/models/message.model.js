import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({

   chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
   },

   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   content: {
      type: String,
      required: true,
      trim: true
   },
   media: {
      type: String,
      default: null
   },
   isLiked: {
      type: Boolean,
      default: false
   },
   readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],


}, { timestamps: true })

export const Message = mongoose.model('Message', messageSchema)