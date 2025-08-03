import { LikePost, SavePost } from "./PostCardActions";
import usePostCardActions from "../../hooks/usePostCardActions";
import PostCardHeader from "./PostCardHeader";
import PostCardMedia from "./PostCardMedia";
import { Confirm } from "@/components";

const PostCard = ({ post }) => {
  if (!post) {
    return null;
  }
  const { _id, likes } = post;
  const {
    toggleLike,
    toggleSave,
    deletePost,
    likesCount,
    isLiked,
    isSaved,
    likeIsPending,
    saveIsPending,
    confirmDelete,
    setConfirmDelete,
  } = usePostCardActions(post._id, likes);

  const handledeletePost = () => {
    deletePost(_id);
    setConfirmDelete(false);
  };

  return confirmDelete ? (
    <Confirm
      onCancel={() => setConfirmDelete(false)}
      onConfirm={handledeletePost}
    />
  ) : (
    <div className="bg-card text-card-foreground rounded-2xl  post-card">
      <PostCardHeader
        post={post}
        deletePost={deletePost}
        setConfirmDelete={setConfirmDelete}
      />

      <div className="caption">{post.caption}</div>

      {post.tags && post.tags.length > 0 && (
        <div className="px-2 mt-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="tags">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <PostCardMedia media={post?.media} thoughts={post?.thoughts} />

      <div className="flex justify-between items-center px-3">
        <LikePost
          postId={post._id}
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeIsPending={likeIsPending}
          likesCount={likesCount}
        />
        <SavePost
          postId={post._id}
          isSaved={isSaved}
          toggleSave={toggleSave}
          saveIsPending={saveIsPending}
        />
      </div>

      {/* COMMENTS ----------> */}
    </div>
  );
};

export default PostCard;
