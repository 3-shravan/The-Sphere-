import { useNavigate } from "react-router-dom";
import { multiFormatDateString } from "@/utils";
import { useAuth } from "@/context";
import {
  useGetPostComments,
  useToggleLikePost,
  useToggleSavePost,
} from "../services";
import { useSelector } from "react-redux";
import { SetImageRatio } from "@/components";
import Comments from "./Comments";
import { Tally2 } from "lucide-react";

const Card = ({ post }) => {
  const { auth } = useAuth();
  const { posts } = useSelector((state) => state.posts);
  const { mutate: toggleLike } = useToggleLikePost();
  const { mutate: toggleSave } = useToggleSavePost();
  // const navigate = useNavigate();

  const updatedPost = posts.find((p) => p._id === post._id);
  const isLiked =
    updatedPost.likes.some((user) => user._id === auth.profile?._id) || false;

  const { savedPosts } = useSelector((state) => state.posts);
  const isSaved = savedPosts.some((p) => post._id === p._id);

  return (
    <div className="bg-card text-card-foreground rounded-lg border md:border-2 border-border px-3 py-3 lg:p-3  lg:max-w-[40vw] ">
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
            <p className="text-xs md:text-sm font-bold ">{post.author?.name}</p>
            <div className="flex gap-2 text-muted-foreground text-[10px] font-medium font-Gilroy ">
              <p>{multiFormatDateString(post.createdAt)}</p>
              {post.location && <p>• {post.location}</p>}
            </div>
          </div>
        </div>

        {auth.profile?._id === post.author?._id && <Tally2 />}
      </div>

      <div className="text-xs font-light font-Gilroy text-muted-foreground px-1 py-4 cursor-pointer">
        <p>{post.caption}</p>
      </div>
      <div className=" flex justify-center font-Poppins ">
        <div className="relative flex justify-center items-center lg:w-[30vw] rounded-xl">
          {post.media && <SetImageRatio src={post.media} />}

          {/* BackdropLike */}
          <div className="absolute bottom-2 left-2 backdrop-blur-md bg-white/20 dark:bg-neutral-800/30 text-sm p-1  rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm">
            <div className="flex cursor-pointer items-center gap-1 px-1">
              <button
                onClick={() => toggleLike(post._id)}
                className="text-sm font-semibold "
              >
                {isLiked ? "❤️" : "🤍"}
              </button>
              <span className="text-xs  ">
                {updatedPost?.likes.length || 0}{" "}
                {updatedPost?.likes.length === 1 ? "Like" : "likes"}
              </span>
            </div>
          </div>
          {/* BackDrop Save */}
          <div className="absolute bottom-2 right-2 backdrop-blur-md bg-white/20 dark:bg-neutral-800/30 text-sm p-1  rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm">
            <div className="flex cursor-pointer items-center gap-1 px-1">
              <button
                className="text-xs px-1 py-0.5 "
                onClick={() => toggleSave(post._id)}
              >
                {isSaved ? "Unsave" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between items-center gap-3 mt-3">
        <div>
          <button
            onClick={() => toggleLike(post._id)}
            className="text-sm font-semibold text-light-1"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <span className="text-xs font-semibold ">
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
      </div> */}

      <Comments postId={post._id} />
    </div>
  );
};

export default Card;
