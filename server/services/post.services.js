import { Post } from "../models/post.model.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const createPost = ({ authorId, caption,thoughts ,location, tags, media }) => {
   try {
      const post = Post.create({
         author: authorId,
         caption,
         thoughts,
         location,
         tags,
         media: media.url,
         public_id: media.public_id,
      })
      return post;
   } catch (error) {
      throw new ErrorHandler(`Error creating new Post: ${error.message}`);
   }
}