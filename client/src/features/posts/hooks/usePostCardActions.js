import { useAuth } from "@/context";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useDeletePost,
  useToggleLikePost,
  useToggleSavePost,
} from "../services";

const usePostCardActions = (postId, likes) => {
  const { auth } = useAuth();
  const currentUserId = auth?.profile?._id;

  //Like Post--->
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(
    likes.some((u) => u._id === currentUserId)
  );

  const { mutate: toggleLike, isPending: likeIsPending } = useToggleLikePost({
    onMutate: () => {
      setIsLiked((prev) => !prev);
      setLikesCount((count) => (isLiked ? count - 1 : count + 1));
    },
    onError: () => {
      setIsLiked((prev) => !prev);
      setLikesCount((count) => (isLiked ? count + 1 : count - 1));
    },
  });
  //save Post--->
  const { mutate: toggleSave, isPending: saveIsPending } = useToggleSavePost();
  const { savedPosts } = useSelector((state) => state.posts);
  const isSaved = savedPosts.some((p) => postId === p._id);

  // Delete Post--->
  const { mutate: deletePost } = useDeletePost();

  return {
    toggleLike,
    toggleSave,
    deletePost,
    likesCount,
    setLikesCount,
    isLiked,
    isSaved,
    likeIsPending,
    saveIsPending,
  };
};

export default usePostCardActions;
