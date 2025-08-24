import { useAuth } from "@/context";
import { useState } from "react";
import { useToggleLikePost } from "../services";

const useLikePost = (likes) => {
  const { currentUserId } = useAuth();

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

  return {
    toggleLike,
    likesCount,
    setLikesCount,
    isLiked,
    likeIsPending,
  };
};

export default useLikePost;
