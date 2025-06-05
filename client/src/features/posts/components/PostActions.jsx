import { Heart } from "lucide-react";

export const LikePost = ({ postId, isLiked, toggleLike, updatedPost }) => {
  return (
    <div className="flex cursor-pointer justify-center items-center gap-1 ">
      <button
        onClick={() => toggleLike(postId)}
        className="text-sm font-semibold cursor-pointer "
      >
        {isLiked ? (
          <Heart className="text-rose-500 w-4 h-4" />
        ) : (
          <Heart className="text-rose-100 w-4 h-4" />
        )}
      </button>
      <span className="text-xs  ">
        {updatedPost?.likes?.length || 0}{" "}
        {updatedPost?.likes?.length === 1 ? "Like" : "likes"}
      </span>
    </div>
  );
};

export const SavePost = ({ postId, isSaved, toggleSave }) => {
  return (
    <button
      className="text-xs  py-0.5 text-rose-400 hover:text-rose-600 cursor-pointer"
      onClick={() => toggleSave(postId)}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};
