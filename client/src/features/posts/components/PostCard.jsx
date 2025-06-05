import { multiFormatDateString } from "@/utils";
import { ProfilePicture, SetImageRatio, ThoughtsCard } from "@/components";
import { Tally2 } from "lucide-react";
import usePostCardActions from "../hooks/usePostCardActions";
import { LikePost, SavePost } from "./PostActions";

const Header = ({
  postId,
  name,
  createdAt,
  location,
  profilePicture,
  userId,
  authorId,
  deletePost,
}) => (
  <div className="flex-between mx-auto pl-2">
    <div className="flex items-center gap-3">
      <ProfilePicture profilePicture={profilePicture} />
      <div className="flex flex-col">
        <p className="text-xs md:text-sm font-bold ">{name}</p>
        <div className="flex gap-2 text-muted-foreground text-[10px] font-medium font-Gilroy ">
          <p>{multiFormatDateString(createdAt)}</p>
          {location && <p>• {location}</p>}
        </div>
      </div>
    </div>
    {userId === authorId && (
      <div onClick={() => deletePost(postId)}>
        <Tally2 />
      </div>
    )}
  </div>
);

const PostCard = ({ post }) => {
  if (!post) return null;
  const {
    auth,
    toggleLike,
    toggleSave,
    deletePost,
    isLiked,
    isSaved,
    updatedPost,
  } = usePostCardActions(post._id);

  return (
    <div className="bg-card text-card-foreground border post-card">
      <Header
        postId={post._id}
        name={post?.author?.name}
        createdAt={post.createdAt}
        location={post.location}
        profilePicture={post.author.profilePicture}
        userId={auth.profile?._id}
        authorId={post.author._id}
        deletePost={deletePost}
      />

      <div className="text-xs font-Futura text-rose-400 dark:text-rose-300 px-3 mt-6 cursor-pointer ">
        <p>{post.caption}</p>
      </div>

      {post.media ? (
        <div className="w-full flex justify-center">
          <div className=" flex w-full px-2 py-2 rounded-xl">
            {post.media && <SetImageRatio src={post.media} />}
          </div>
        </div>
      ) : (
        <ThoughtsCard thought={post.thoughts} className={"pt-0"} />
      )}

      <div className="flex justify-between items-center px-3">
        <LikePost
          postId={post._id}
          isLiked={isLiked}
          toggleLike={toggleLike}
          updatedPost={updatedPost}
        />
        <SavePost postId={post._id} isSaved={isSaved} toggleSave={toggleSave} />
      </div>
    </div>
  );
};

export default PostCard;
