import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import useLikePost from "../../hooks/useLikePost";
import { Link } from "react-router-dom";
import { LikeModal } from "../ui/LikeModal";

const LikePost = ({ postId, likes, likedBy = true }) => {
  const { toggleLike, likesCount, isLiked, likeIsPending } = useLikePost(likes);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex font-Gilroy items-center gap-2 text-sm">
        <button
          onClick={() => !likeIsPending && toggleLike(postId)}
          className="cursor-pointer  min-w-8 flex items-center gap-1"
        >
          {isLiked ? (
            <FaHeart className="text-third w-4 h-4" />
          ) : (
            <Heart
              className={` ${!likedBy && "text-muted-foreground"} w-4 h-4`}
            />
          )}
          <span
            className={`font-bold text-xs ${
              !likedBy && "text-muted-foreground"
            }`}
          >
            {likesCount}
          </span>
        </button>
        {/* Liked by */}
        {likedBy && (
          <>
            <span>·</span>
            {likesCount > 0 ? (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <div className="flex -space-x-2">
                  {likes.slice(0, 3).map((user) =>
                    user?.profilePicture ? (
                      <img
                        key={user._id}
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-5 h-5 object-cover rounded-full border-2 border-rose-200"
                      />
                    ) : (
                      <div
                        key={user._id}
                        className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-r from-rose-300 to-rose-400 flex items-center justify-center text-muted text-xs font-Futura font-bold"
                      >
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )
                  )}
                </div>
                <span className="text-xs text-muted-foreground hover:text-foreground">
                  liked by {likes[0]?.name}{" "}
                  {likesCount > 1 && <>and {likesCount - 1} others</>}
                </span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                Be the first to like
              </span>
            )}
          </>
        )}
      </div>

      {/* Modal for showing all likes */}
      {showModal && <LikeModal likes={likes} setShowModal={setShowModal} />}
    </>
  );
};

export default LikePost;
