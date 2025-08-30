import useComment from "./hooks/useComment";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import { useState } from "react";
import { ProfilePicture } from "@/components";
import { MessageSquare } from "lucide-react";

const Comments = ({ postId, expanded }) => {
  const { comments, isLoading, topComment } = useComment(postId);
  const [expand, setExpand] = useState(expanded | false);

  if (isLoading) return <p>Loading comments...</p>;
  return (
    <div className="md:px-2.5 px-2 text-sm max-h-[60vh] transition-all duration-200 overflow-y-auto font-Poppins text-foreground">
      <div className="mt-2">
        <div
          className="font-Gilroy flex text-xs text-muted-foreground gap-2 mb-2 cursor-pointer"
          onClick={() => setExpand((prev) => !prev)}
        >
          <span>
            <MessageSquare size={17} className="-ml-0.5 inline" />
            <span className="text-foreground font-bold ml-1">
              {comments.comments.length}
            </span>
          </span>
          <span className="font-bold">·</span>
          {comments.comments.length > 0 ? (
            <span className="px-0.5 hover:text-foreground text-muted-foreground ">
              {expand ? "collapse" : "view"}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Be the first to comment
            </span>
          )}
        </div>

        {expand ? (
          <div className="space-y-2 -ml-1">
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
          topComment && (
            <div
              className="flex gap-2 cursor-default text-xs my-1 -ml-1"
              onClick={() => setExpand((prev) => !prev)}
            >
              <ProfilePicture
                profilePicture={topComment?.author?.profilePicture}
                size="sm"
              />
              <span>
                <span className="text-muted-foreground/80">
                  {topComment?.author.name} commented{" "}
                </span>
                <span className="italic"> "{topComment?.comment}"</span>
              </span>
            </div>
          )
        )}
      </div>
      <AddComment postId={postId} />
    </div>
  );
};

export default Comments;
