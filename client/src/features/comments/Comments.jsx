import useComment from "./hooks/useComment";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import { useState } from "react";
import { ProfilePicture } from "@/components";

const Comments = ({ postId, expanded }) => {
  const { comments, isLoading, topComment } = useComment(postId);
  const [expand, setExpand] = useState(expanded | false);

  if (isLoading) return <p>Loading comments...</p>;
  return (
    <div className="md:px-2.5 px-2 text-sm max-h-[60vh] transition-all duration-200 overflow-y-auto font-Poppins text-foreground">
      <div className="mt-2">
        <h3
          className="font-Futura text-sm mb-2 cursor-pointer"
          onClick={() => setExpand((prev) => !prev)}
        >
          Comments {comments.comments.length}
        </h3>

        {comments?.comments?.length === 0 ? (
          <p className="text-sm font-Gilroy  text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : expand ? (
          <div className="space-y-3">
            {comments?.comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postId={postId}
                parentId={comment._id}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-2 my-1 -ml-1">
            <ProfilePicture
              profilePicture={topComment?.author?.profilePicture}
              size="sm"
            />
            <span>{topComment?.comment}</span>
          </div>
        )}
      </div>
      <AddComment postId={postId} />
    </div>
  );
};

export default Comments;
