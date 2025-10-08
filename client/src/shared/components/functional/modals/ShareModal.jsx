import { Forward, Link as LinkIcon, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CLIENT_URL } from "@/lib/utils/api";
import { showErrorToast, showSuccessToast } from "@/lib/utils/api-responses";

export default function ShareModal({ postId }) {
	const postUrl = `${CLIENT_URL}/post/${postId}`;
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(postUrl);
			showSuccessToast("🚀 Link copied to clipboard");
		} catch {
			showErrorToast("❌ Failed to copy link");
		}
	};

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Check out this post",
					url: postUrl,
				});
			} catch {
				showErrorToast("❌ Failed to share");
			}
		} else {
			showErrorToast("⚡ Native share not supported on this device");
		}
	};

	const itemClasses =
		"flex items-center gap-3 p-3 rounded-lg font-Futura shadow-sm hover:shadow-md transition text-sm cursor-pointer";

	return (
		<div className="grid grid-cols-1 text-black sm:grid-cols-2  lg:grid-cols-2 gap-3 sm:gap-4 px-4 py-5">
			{/* WhatsApp */}
			<a
				href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
				target="_blank"
				rel="noopener noreferrer"
				className={`${itemClasses} bg-green-50 hover:bg-green-100`}
			>
				<MessageCircle className="w-5 h-5 text-green-700" />
				<span>WhatsApp</span>
			</a>

			{/* Copy Link */}
			<button
				onClick={handleCopy}
				className={`${itemClasses} bg-gray-50 hover:bg-gray-100`}
			>
				<LinkIcon className="w-5 h-5 text-gray-700" />
				<span>Copy Link</span>
			</button>

			{/* Native Share */}
			<button
				onClick={handleNativeShare}
				className={`${itemClasses} border text-foreground bg-primary/5 hover:bg-primary/10 sm:col-span-2 lg:col-span-3 justify-center`}
			>
				<Share2 className="w-5 h-5 " />
				<span>More Options</span>
			</button>

			{/* View Post (internal link) */}
			<Link
				to={`/post/${postId}`}
				className={`${itemClasses} border text-foreground bg-accent/5 hover:bg-accent/40 sm:col-span-2 lg:col-span-3 justify-center`}
			>
				<Forward className="w-5 h-5 " />
				<span>View Post</span>
			</Link>
		</div>
	);
}
