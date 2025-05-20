import { useNavigate } from "react-router-dom";
import { multiFormatDateString } from "@/utils";
import { useAuth } from "@/context";
import { useToggleLikePost, useToggleSavePost } from "../services";
import { useSelector } from "react-redux";

const Card = ({ post, savepost }) => {
  const { auth } = useAuth();
  const { posts } = useSelector((state) => state.posts);
  const { mutate: toggleLike } = useToggleLikePost();
  const { mutate: toggleSave } = useToggleSavePost();
  const navigate = useNavigate();

  const updatedPost = posts.find((p) => p._id === post._id);
  const isLiked =
    updatedPost.likes.some((user) => user._id === auth.profile?._id) || false;

  const { savedPosts } = useSelector((state) => state.posts);
  const isSaved = savedPosts.some((p) => post._id === p._id);
  
  return (
    <div className="bg-neutral-950 rounded-4xl border-1 border-muted px-3 py-3 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={
              post.author?.profilePicture ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => navigate(`/profile/${post.author?._id}`)}
          />
          <div className="flex flex-col">
            <p className="text-base font-bold text-light-1">
              {post.author?.name}
            </p>
            <div className="flex gap-2 text-light-3 text-xs font-semibold">
              <p>{multiFormatDateString(post.createdAt)}</p>
              {post.location && <p>• {post.location}</p>}
            </div>
          </div>
        </div>

        {auth.profile?._id === post.author?._id && (
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => navigate(`/update-post/${post._id}`)}
          />
        )}
      </div>

      <div
        className="text-sm font-medium py-4 cursor-pointer"
        onClick={() => navigate(`/posts/${post._id}`)}
      >
        <p>{post.caption}</p>
      </div>

      {post.media && (
        <img
          src={post.media}
          alt="post image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-2xl object-cover mb-5 cursor-pointer"
          onClick={() => navigate(`/posts/${post._id}`)}
        />
      )}

      <div className="flex justify-between items-center gap-3 mt-3">
        <div>
          <button
            onClick={() => toggleLike(post._id)}
            className="text-sm font-semibold text-light-1"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <span className="text-xs font-semibold text-light-3">
            {updatedPost?.likes.length || 0}{" "}
            {updatedPost?.likes.length === 1 ? "Like" : "Likes"}
          </span>
        </div>

        <button
          className="text-sm px-3 py-2"
          onClick={() => toggleSave(post._id)}
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Card;
