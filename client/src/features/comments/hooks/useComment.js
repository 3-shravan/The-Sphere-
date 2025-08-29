import { useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostComments,
} from "../services";
import { useAuth } from "@/context";

const useComment = (postId) => {
  const [comment, setComment] = useState("");
  const { data: comments, isLoading } = useGetPostComments(postId);
  const topComment = comments?.comments[0];

  const { mutateAsync: createComment } = useCreateComment(postId);
  const { mutateAsync: deleteComment } = useDeleteComment(postId);

  const handleCreate = async (parentId = null) => {
    if (!comment.trim()) return;
    await createComment({ comment, parentId });
    setComment("");
  };
  const handleCreateReply = async (parentId, reply) => {
    if (!reply.trim()) return;
    const comment = reply;
    await createComment({ comment, parentId });
  };
  const handleDelete = async (commentId) => {
    if (!postId || !commentId)
      return console.warn("Missing postId or commentId", commentId);
    await deleteComment({ commentId });
  };
  const { currentUserId } = useAuth();
  const canDelete = (id) => currentUserId === id;
  return {
    comment,
    comments,
    topComment,
    setComment,
    handleCreate,
    handleCreateReply,
    handleDelete,
    canDelete,
    isLoading,
  };
};
export default useComment;
