import { Confirm } from "@/components";
import PostCardHeader from "./PostCardHeader";
import PostCardMedia from "./PostCardMedia";
import { LikePost, SavePost, ShowTags } from "@/shared";
import { useDeletePost } from "@/features/posts/services";
import { useRef, useState } from "react";
import Comments from "@/features/comments/Comments";

const PostCard = ({ post }) => {
  if (!post) return null;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const likePostRef = useRef(null);

  const { mutate: deletePost } = useDeletePost();
  const handledeletePost = () => {
    deletePost(post._id);
    setConfirmDelete(false);
  };

  return confirmDelete ? (
    <Confirm
      onCancel={() => setConfirmDelete(false)}
      onConfirm={handledeletePost}
    />
  ) : (
    <div className="post-card">
      <PostCardHeader
        post={post}
        deletePost={deletePost}
        setConfirmDelete={setConfirmDelete}
      />

      <div className="caption">{post.caption}</div>

      <div className="px-2">
        <ShowTags tags={post.tags} />
      </div>

      <PostCardMedia
        media={post?.media}
        thoughts={post?.thoughts}
        likePostRef={likePostRef}
      />

      <div className="flex-between px-2">
        <LikePost postId={post._id} likes={post.likes} ref={likePostRef} />
        <SavePost postId={post._id} />
      </div>

      {/* COMMENTS ----------> */}
      <Comments postId={post._id} />
    </div>
  );
};

export default PostCard;
