import mongoose from "mongoose";
const storySchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   image: {
      type: String,
      required: true
   },
   text: {
      type: String,
      default: ""
   },
   isDeleted: {
      type: Boolean,
      default: false
   },
   isExpired: {
      type: Boolean,
      default: false
   },
}, { timestamps: true })

export const Story = mongoose.model("Story", storySchema)