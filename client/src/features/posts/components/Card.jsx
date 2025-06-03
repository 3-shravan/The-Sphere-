import { multiFormatDateString } from "@/utils";
import { useAuth } from "@/context";
import { useToggleLikePost, useToggleSavePost } from "../services";
import { useSelector } from "react-redux";
import { SetImageRatio } from "@/components";
import Comments from "./Comments";
import { Heart, Tally2 } from "lucide-react";

const Card = ({ post }) => {
  const { auth } = useAuth();
  const { mutate: toggleLike } = useToggleLikePost();
  const { mutate: toggleSave } = useToggleSavePost();

  const { posts } = useSelector((state) => state.posts);
  const updatedPost = posts.find((p) => p._id === post._id);
  const isLiked =
    updatedPost.likes.some((user) => user._id === auth.profile?._id) || false;

  const { savedPosts } = useSelector((state) => state.posts);
  const isSaved = savedPosts.some((p) => post._id === p._id);

  return (
    <div className="bg-card text-card-foreground rounded-2xl md:rounded-lg border md:border-2 border-border post-card">
      <Header
        name={post?.author?.name}
        createdAt={post.createdAt}
        location={post.location}
        profilePicture={post.author.profilePicture}
        userId={auth.profile?._id}
        postId={post.author._id}
      />

      <div className="text-xs  font-Futura text-rose-400 dark:text-rose-300 px-3 mt-8 cursor-pointer ">
        <p>{post.caption}</p>
      </div>

      <div className="w-full flex justify-center">
        <div className=" flex w-full px-2 py-2 rounded-xl">
          {post.media && <SetImageRatio src={post.media} />}
        </div>
      </div>

      <div className="flex justify-between items-center px-3">
        <LikePost
          postId={post._id}
          isLiked={isLiked}
          toggleLike={toggleLike}
          updatedPost={updatedPost}
        />
        <SavePost postId={post._id} isSaved={isSaved} toggleSave={toggleSave} />
      </div>

      {/* <Comments postId={post._id} /> */}
    </div>
  );
};

export default Card;

const Header = ({
  name,
  createdAt,
  location,
  profilePicture,
  userId,
  postId,
}) => (
  <div className="flex-between mx-auto pl-2">
    <div className="flex items-center gap-3">
      <img
        src={profilePicture}
        alt="creator"
        className="w-8 h-8 rounded-full cursor-pointer"
      />
      <div className="flex flex-col">
        <p className="text-xs md:text-sm font-bold ">{name}</p>
        <div className="flex gap-2 text-muted-foreground text-[10px] font-medium font-Gilroy ">
          <p>{multiFormatDateString(createdAt)}</p>
          {location && <p>• {location}</p>}
        </div>
      </div>
    </div>
    {userId === postId && <Tally2 />}
  </div>
);

const LikePost = ({ postId, isLiked, toggleLike, updatedPost }) => {
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
        {updatedPost?.likes.length || 0}{" "}
        {updatedPost?.likes.length === 1 ? "Like" : "likes"}
      </span>
    </div>
  );
};

const SavePost = ({ postId, isSaved, toggleSave }) => {
  return (
    <button
      className="text-xs  py-0.5 text-rose-400 hover:text-rose-600 cursor-pointer"
      onClick={() => toggleSave(postId)}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};
