import useComment from "../hooks/useComment";
import CommentBox from "./CommentBox";
import ReplyBox from "./ReplyBox";
import { useState } from "react";

const Comment = ({ comment, postId, parentId }) => {
  const { handleCreateReply, handleDelete, canDelete } = useComment(postId);
  const [replyInput, setReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div>
      <CommentBox
        comment={comment}
        handleDelete={handleDelete}
        setReplyInput={setReplyInput}
        replyInput={replyInput}
        canDelete={canDelete}
        showReplies={showReplies}
        setShowReplies={setShowReplies}
      />

      {replyInput && (
        <ReplyBox
          handleCreateReply={handleCreateReply}
          parentId={parentId}
          setReplyInput={setReplyInput}
        />
      )}
      {showReplies &&
        comment?.replies?.length > 0 &&
        comment.replies.map((c) => (
          <div key={c._id} className="ml-8">
            <Comment comment={c} parentId={c._id} postId={postId} />
          </div>
        ))}
      {comment.replies.length > 0 && showReplies && (
        <div
          className="flex items-center text-[10px] gap-1 pl-10 hover:text-primary transition"
          onClick={() => setShowReplies((prev) => !prev)}
        >
          ........Hide Replies
        </div>
      )}
    </div>
  );
};

export default Comment;
