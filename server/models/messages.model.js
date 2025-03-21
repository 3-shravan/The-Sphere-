import mongoose, { mongo } from 'mongoose'
const messageSchema = new mongoose.Schema({

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
   message: {
      type: String,
      reuired: true
   }

})

export const Message = mongoose.model('Message', messageSchema)