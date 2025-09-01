import { Post } from "../models/post.model.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const createPost = ({
  authorId,
  caption,
  thoughts,
  location,
  tags,
  media,
}) => {
  const { url = null, public_id = null } = media || {};
  try {
    const post = Post.create({
      author: authorId,
      caption,
      thoughts,
      location,
      tags,
      media: url,
      public_id: public_id,
    });
    return post;
  } catch (error) {
    throw new ErrorHandler(`Error creating new Post: ${error.message}`);
  }
};
