import { useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostComments,
} from "../services";
import { MessageSquare } from "lucide-react";

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
    <div className=" md:px-4 px-1 flex text-xs text-foreground">
      <MessageSquare size={16} />
      <button className="px-1" onClick={handleCreate}>
        Comment (soon)
      </button>

      <button onClick={() => handleDelete("6832f27b05d63d4e32c3c462")}></button>
    </div>
  );
};

export default Comments;
