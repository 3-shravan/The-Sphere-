import Comment from "./Comment";
export default function CommentList({ comments, postId }) {
	return (
		<div className="space-y-2 -ml-1">
			{comments?.map((comment) => (
				<Comment
					key={comment._id}
					comment={comment}
					postId={postId}
					parentId={comment._id}
				/>
			))}
		</div>
	);
}
