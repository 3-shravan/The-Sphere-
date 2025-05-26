import { useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostComments,
} from "../services";

const Comments = ({ postId }) => {
  const { data: commentsData, isLoading, error } = useGetPostComments(postId);
  // console.log(commentsData);
  const [comment, setComment] = useState("how are you doing?");

  const { mutateAsync: createComment } = useCreateComment(postId);
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleCreate = async () => {
    if (!comment.trim()) return;
    await createComment({ comment, postId });
    setComment("");
  };

  const handleDelete = async (commentId) => {
    if (!postId || !commentId)
      return console.warn("Missing postId or commentId", postId, commentId);
    await deleteComment({ postId, commentId });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments</p>;

  return (
    <div className="py-2 px-1 text-xs text-muted-foreground">
      <button className="px-2" onClick={handleCreate}>
        Comment
      </button>

      <button onClick={() => handleDelete("6832f27b05d63d4e32c3c462")}>
        Delete{" "}
      </button>
    </div>
  );
};

export default Comments;
