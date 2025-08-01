import { useState } from "react";
import { LikePost, SavePost } from "./PostCardActions";
import usePostCardActions from "../../hooks/usePostCardActions";
import PostCardHeader from "./PostCardHeader";
import PostCardMedia from "./PostCardMedia";
import PostOptions from "./PostOptions";

const PostCard = ({ post }) => {
  if (!post) {
    return null;
  }

  const { likes } = post;
  const {
    toggleLike,
    toggleSave,
    deletePost,
    likesCount,
    isLiked,
    isSaved,
    likeIsPending,
    saveIsPending,
  } = usePostCardActions(post._id, likes);
  return (
    <div className="bg-card text-card-foreground rounded-2xl  post-card">
      <PostCardHeader post={post} deletePost={deletePost} />

      <div className="text-xs font-Futura text-rose-400 dark:text-rose-300 px-3 mt-6 cursor-pointer ">
        <p>{post.caption}</p>
      </div>

      <PostCardMedia media={post?.media} thoughts={post?.thoughts} />

      <div className="flex justify-between items-center px-3">
        <LikePost
          postId={post._id}
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeIsPending={likeIsPending}
          likesCount={likesCount}
        />
        <SavePost
          postId={post._id}
          isSaved={isSaved}
          toggleSave={toggleSave}
          saveIsPending={saveIsPending}
        />
      </div>

      {/* COMMENTS ----------> */}
    </div>
  );
};

export default PostCard;
