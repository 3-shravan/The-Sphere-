import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePicture, Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import Comments from "@/features/comments/Comments";
import { LikePost, PostOptions, SavePost, ShowTags } from "@/shared";

export default function ViewPostInfo({ postId, post, setShowModal }) {
	const navigate = useNavigate();
	if (!post) return null;

	const handleBackNavigation = () => {
		if (window.history.state && window.history.state.idx > 0) navigate(-1);
		else navigate("/feeds");
	};

	return (
		<div className="w-full md:px-6 md:w-1/2 flex flex-col p-3 overflow-y-auto custom-scrollbar-hide h-screen md:p-8 border-border ">
			<header className="flex px-1 items-center justify-between">
				<div className="flex items-center gap-3">
					<ProfilePicture
						profilePicture={post?.author?.profilePicture}
						username={post?.author?.name}
						size={"md"}
					/>
					<div>
						<Link to={`/profile/${post?.author?.name}`} className="text-sm">
							{post?.author?.name}
						</Link>
						<p className="text-[9px] text-muted-foreground">
							{post?.createdAt && !isNaN(new Date(post.createdAt)) ? (
								formatDistanceToNow(new Date(post?.createdAt), {
									addSuffix: true,
								})
							) : (
								<Spinner className="w-3 h-3" />
							)}
						</p>
					</div>
				</div>
				<div className="flex">
					<PostOptions
						postId={postId}
						author={post?.author}
						thoughts={post?.thoughts}
					/>
					<button
						onClick={handleBackNavigation}
						className="bg-muted text-xs px-2 py-1 flex items-center cursor-pointer rounded-full hover:bg-third transition"
					>
						&lt; back
					</button>
				</div>
			</header>

			<div className="flex-1 mt-4  space-y-2  ">
				{post?.caption && post?.media && (
					<p className="text-sm font-Futura border-b px-2 py-2 border-muted">
						{post?.caption}
					</p>
				)}
				<ShowTags tags={post?.tags} />

				<div className="flex px-2 items-center justify-between gap-4">
					<LikePost postId={post?._id} likes={post?.likes} />
					<div className="flex flex-col gap-2">
						<SavePost postId={post?._id} />
						<Button
							variant="outline"
							className="hidden md:block text-xs cursor-pointer"
							onClick={() => setShowModal(true)}
						>
							Share
						</Button>
					</div>
				</div>
				<Comments postId={post?._id} expanded={true} />
			</div>
		</div>
	);
}
