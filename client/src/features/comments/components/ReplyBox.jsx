import { SendHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ReplyBox = ({
	handleCreateReply,
	parentId,
	setReplyInput,
	commenting,
	setShowReplies,
}) => {
	const [reply, setReply] = useState("");
	const createReply = () => {
		handleCreateReply(parentId, reply);
		setReplyInput((prev) => !prev);
		setReply("");
	};
	return (
		<div className="my-1 gap-1 items-center pb-2 ml-10 justify-end flex md:w-[50%]">
			<Textarea
				value={reply}
				variant="reply"
				onChange={(e) => setReply(e.target.value)}
				placeholder="reply 🗽"
			/>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					if (!commenting) createReply();
					setShowReplies(true);
				}}
			>
				{commenting ? <Spinner /> : <SendHorizontalIcon size={12} />}
			</Button>
		</div>
	);
};
export default ReplyBox;
