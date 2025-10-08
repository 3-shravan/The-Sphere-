import { PiHeartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ProfilePicture } from "@/components";
import { Button } from "@/components/ui/button";
import { useIgnoreLenisScroll } from "@/hooks";

export default function ShowUserModel({ title = "Users", users, onCancel }) {
	useIgnoreLenisScroll(".scroll");
	return (
		<>
			<h2 className="flex items-center text-2xl gap-1 px-4 font-semibold mb-4">
				<PiHeartFill size={27} className="text-third" /> {title}
			</h2>
			<ul className="space-y-2 p-2 overflow-y-auto max-h-90 scroll ">
				{users.map((user) => (
					<li
						key={user._id}
						className="flex hover:bg-card rounded-sm cursor-pointer p-2 items-center gap-2"
					>
						<ProfilePicture
							profilePicture={user.profilePicture}
							size="md"
							username={user.name}
						/>
						<Link
							to={`/profile/${user.name}`}
							className="text-sm font-Futura text-foreground"
						>
							{user.name}
						</Link>
					</li>
				))}
			</ul>
			<Button
				onClick={() => onCancel(false)}
				className="mt-4 w-full py-1 cursor-pointer text-sm text-foreground bg-muted hover:bg-rose-500"
			>
				Close
			</Button>
		</>
	);
}
