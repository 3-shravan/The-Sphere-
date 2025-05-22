import { useNavigate } from "react-router-dom";
import { multiFormatDateString } from "@/utils";
import { useAuth } from "@/context";
import { useToggleLikePost, useToggleSavePost } from "../services";
import { useSelector } from "react-redux";
import { SetImageRatio } from "@/components";

const Card = ({ post }) => {
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
    <div className="bg-card text-card-foreground rounded-4xl border-1 border-border px-3 py-3 lg:p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={
              post.author?.profilePicture ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div className="flex flex-col">
            <p className="text-sm font-bold ">{post.author?.name}</p>
            <div className="flex gap-2 text-muted-foreground text-xs font-medium font-Gilroy ">
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
          />
        )}
      </div>

      <div className="text-xs font-light font-Gilroy text-muted-foreground px-1 py-4 cursor-pointer">
        <p>{post.caption}</p>
      </div>

      <div className=" flex justify-center items-center rounded-4xl">
        {post.media && <SetImageRatio src={post.media} />}
      </div>

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
