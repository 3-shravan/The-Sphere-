import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
   participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   }],
   lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
   },
   blockedParticipants: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      blockedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      blockedAt: { type: Date, default: Date.now }
   }],
   unreadMessages: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      count: { type: Number, default: 0 }
   }],
   conversationName: {
      type: String,
      default: ""
   },
   isGroupChat: {
      type: Boolean,
      default: false
   },
   groupPicture: {
      type: String,
      default: ""
   },

   admins: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],

   mutedBy: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ],
   pinnedBy: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ],
   typingUsers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ],
   archivedBy: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ],
   isDeleted: {
      type: Boolean,
      default: false
   },

}, { timestamps: true })


export const Conversation = mongoose.model('Conversation', conversationSchema)