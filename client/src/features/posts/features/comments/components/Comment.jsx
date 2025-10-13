import { useState } from "react";
import useComment from "../hooks/useComment";
import CommentBox from "./CommentBox";
import ReplyBox from "./ReplyBox";

const Comment = ({ comment, postId, parentId }) => {
	const { handleCreateReply, handleDelete, canDelete, deleting, commenting } =
		useComment(postId);
	const [replyInput, setReplyInput] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	return (
		<div className="rounded-lg">
			<CommentBox
				comment={comment}
				handleDelete={handleDelete}
				setReplyInput={setReplyInput}
				replyInput={replyInput}
				canDelete={canDelete}
				showReplies={showReplies}
				setShowReplies={setShowReplies}
				deleting={deleting}
				commenting={commenting}
			/>

			{replyInput && (
				<ReplyBox
					handleCreateReply={handleCreateReply}
					parentId={parentId}
					setReplyInput={setReplyInput}
					commenting={commenting}
					setShowReplies={setShowReplies}
				/>
			)}
			{showReplies &&
				comment?.replies?.length > 0 &&
				comment.replies.map((c) => (
					<div key={c._id} className="ml-10 my-1">
						<Comment comment={c} parentId={c._id} postId={postId} />
					</div>
				))}
			{comment.replies.length > 0 && showReplies && (
				<div
					className="flex items-center text-[10px] cursor-pointer text-rose-300 gap-1 pl-10 hover:text-second transition"
					onClick={() => setShowReplies((prev) => !prev)}
				>
					........Hide Replies
				</div>
			)}
		</div>
	);
};

export default Comment;
