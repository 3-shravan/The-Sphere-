import { useState, forwardRef, useImperativeHandle } from "react";
import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from "@/context";
import { useErrorToast } from "@/hooks";
import LikeModal from "../modals/ShowUserModal";
import useLikePost from "../../hooks/useLikePost";
import { Modal } from "@/components";

const LikePost = forwardRef(
  ({ postId, likes: initialLikes = [], likedBy = true }, ref) => {
    const { toggleLike, likes, likesCount, isLiked } =
      useLikePost(initialLikes);

    const [showModal, setShowModal] = useState(false);
    const [animate, setAnimate] = useState(false);

    const { auth } = useAuth();

    useImperativeHandle(ref, () => ({
      triggerLike: () => handleLike(),
    }));

    const handleLike = () => {
      if (!auth.isAuthenticated)
        return useErrorToast({}, "Please login to like posts");
      toggleLike(postId);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    };

    return (
      <>
        <div className="flex font-Gilroy items-center gap-2 text-sm">
          <button
            onClick={handleLike}
            className="cursor-pointer min-w-8 flex items-center gap-1"
          >
            {isLiked ? (
              <FaHeart
                className={`text-rose-600 w-4 h-4 transition-transform duration-200 ${
                  animate ? "scale-125" : ""
                }`}
              />
            ) : (
              <Heart
                className={`w-4 h-4 transition-transform duration-200 ${
                  animate ? "scale-125" : ""
                }`}
              />
            )}
            <span
              className={`font-bold text-xs ${
                !likedBy && "text-muted-foreground text-auto-contrast "
              }`}
            >
              {likesCount}
            </span>
          </button>

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

        {showModal && (
          <Modal darkModal={true}>
            <LikeModal title="Liked by" users={likes} onCancel={setShowModal} />
          </Modal>
        )}
      </>
    );
  }
);

export default LikePost;
