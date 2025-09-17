import { useState } from "react";
import useComment from "./hooks/useComment";
import {
  AddComment,
  CommentList,
  TopCommentPreview,
  CommentsCount,
} from "./components";
import { Loading } from "@/components";

const Comments = ({ postId, expanded }) => {
  const { comments, isLoading, topComment } = useComment(postId);
  const [expand, setExpand] = useState(expanded | false);

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="md:px-2 px-2 text-sm max-h-[50vh] md:max-h-[60vh] transition-all duration-200 overflow-y-auto font-Poppins text-foreground">
        <div className="mt-2">
          <CommentsCount
            count={comments?.comments?.length}
            expand={expand}
            onToggle={() => setExpand((prev) => !prev)}
          />
          {expand ? (
            <CommentList comments={comments?.comments} postId={postId} />
          ) : (
            topComment && (
              <TopCommentPreview
                topComment={topComment}
                onClick={() => setExpand(true)}
              />
            )
          )}
        </div>
      </div>
      <AddComment postId={postId} />
    </>
  );
};

export default Comments;
