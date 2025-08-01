import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";

export const LikePost = ({
  postId,
  isLiked,
  toggleLike,
  likesCount,
  likeIsPending,
}) => {
  return (
    <div className="flex cursor-pointer justify-center items-center gap-1 ">
      <button
        onClick={() => !likeIsPending && toggleLike(postId)}
        className="text-sm font-semibold cursor-pointer "
      >
        {isLiked ? (
          <FaHeart className="text-rose-500 w-4 h-4" />
        ) : (
          <Heart className="text-rose-100 w-4 h-4" />
        )}
      </button>
      <span className="text-xs  ">
        {likesCount} {likesCount === 1 ? "Like" : "likes"}
      </span>
    </div>
  );
};

export const SavePost = ({ postId, isSaved, toggleSave, saveIsPending }) => {
  return (
    <button
      className="text-xs py-0.5 text-rose-400 hover:text-rose-600 cursor-pointer"
      onClick={() => !saveIsPending && toggleSave(postId)}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};
