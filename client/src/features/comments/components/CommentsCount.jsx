import { MessageSquare } from "lucide-react";
export default function CommentsCount({ count, expand, onToggle }) {
	return (
		<header
			className="font-Gilroy flex text-xs text-muted-foreground gap-2 mb-2 cursor-pointer"
			onClick={onToggle}
		>
			<span className="min-w-8">
				<MessageSquare size={16} className=" text-foreground inline" />
				<span className="text-foreground font-bold ml-1">{count}</span>
			</span>
			<span className="font-bold">·</span>
			{count > 0 ? (
				<span className="px-0.5 hover:text-foreground text-muted-foreground ">
					{expand ? "collapse" : "view"}
				</span>
			) : (
				<span className="text-xs text-muted-foreground">
					Be the first to comment
				</span>
			)}
		</header>
	);
}
