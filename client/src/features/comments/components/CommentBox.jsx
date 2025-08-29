import { multiFormatDateString } from "@/utils";
import { Eye, MessageSquare, Trash, Trash2 } from "lucide-react";

const CommentBox = ({
  comment,
  handleDelete,
  replyInput,
  setReplyInput,
  canDelete,
  showReplies,
  setShowReplies,
}) => {
  return (
    <div className="rounded-2xl  p-2">
      <div className="flex items-start gap-3">
        {comment.author.profilePicture ? (
          <img
            src={comment.author.profilePicture}
            className="w-6 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {comment.author?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-muted-foreground text-xs">
              {comment.author?.name || "Anonymous"}
            </h4>
            <span className="text-[9px] text-muted-foreground">
              {multiFormatDateString(comment.createdAt)}
            </span>
          </div>

          <p className="text-xs mt-1 text-foreground">{comment.comment}</p>

          {/* Actions */}
          <div className="flex gap-2 mt-2 text-[10px] text-muted-foreground">
            <button
              onClick={() => setReplyInput((prev) => !prev)}
              className="flex items-center gap-1 hover:text-primary transition"
            >
              <MessageSquare size={14} />
              {replyInput ? "Cancel" : "Reply"}
            </button>

            {comment.replies.length > 0 && (
              <div
                className="flex items-center gap-1 hover:text-primary transition"
                onClick={() => setShowReplies((prev) => !prev)}
              >
                <Eye size={13} /> {showReplies ? "Cancel" : "Show Replies"}
              </div>
            )}

            {canDelete(comment.author._id) && (
              <button
                onClick={() => handleDelete(comment._id)}
                className="flex items-center gap-0.5 text-rose-400 hover:text-rose-600 transition"
              >
                <Trash size={12} />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
