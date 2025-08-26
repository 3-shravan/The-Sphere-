import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import useLikePost from "../../hooks/useLikePost";
import { Link } from "react-router-dom";

const LikePost = ({ postId, likes, likedBy = true }) => {
  const { toggleLike, likesCount, isLiked, likeIsPending } = useLikePost(likes);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex font-Gilroy items-center gap-2 text-sm">
        <button
          onClick={() => !likeIsPending && toggleLike(postId)}
          className="cursor-pointer flex items-center gap-1"
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
                  {likes.slice(0, 3).map((user) => (
                    <img
                      key={user._id}
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-5 h-5 rounded-full border-2 border-rose-200"
                    />
                  ))}
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl shadow-lg p-4 w-80 max-h-[70vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Liked by</h2>
            <ul className="space-y-2">
              {likes.map((user) => (
                <li key={user._id} className="flex items-center gap-2">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <Link
                    to={`/profile/${user.name}`}
                    className="text-sm text-foreground"
                  >
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 cursor-pointer rounded-lg bg-muted hover:bg-rose-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LikePost;
