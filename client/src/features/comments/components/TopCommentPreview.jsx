import { ProfilePicture } from "@/components";

export default function TopCommentPreview({ topComment, onClick }) {
	return (
		<div className="flex gap-2 cursor-default text-xs my-1" onClick={onClick}>
			<ProfilePicture
				profilePicture={topComment?.author?.profilePicture}
				username={topComment?.author?.username}
				size="sm"
			/>
			<span>
				<span className=" ml-1  text-muted-foreground/80">
					{topComment?.author?.name} commented{" "}
				</span>
				<span className="font-Futura text-xs italic">
					&quot;{topComment?.comment}&quot;
				</span>
			</span>
		</div>
	);
}
