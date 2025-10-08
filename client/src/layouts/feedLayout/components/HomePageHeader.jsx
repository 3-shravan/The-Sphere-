import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HappyBirthday, ProfilePicture } from "@/components";
import { useAuth } from "@/context";

const HomePageHeader = () => {
	const { auth, isBirthday } = useAuth();
	const navigate = useNavigate();
	return (
		<div className="flex-between md:py- 1 md:mt-1 pt-2 ">
			{/* TIME  */}
			<span className="px-6 text-xs font-blackout hidden tracking-widest md:block text-second">
				{new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
			{/* BIRTHDAY WISHES */}
			<div className="hidden md:block">
				<HappyBirthday />
			</div>

			{/* PROFILE */}
			<div
				className="hidden md:flex items-center  cursor-pointer tracking-tight rounded px-7 py-2 "
				onClick={() => navigate(`/profile/${auth?.profile?.name}`)}
			>
				<ProfilePicture
					profilePicture={auth?.profile?.profilePicture}
					size="sm"
				/>

				<span className="font-Poppins text-sm font-bold  px-2 text-foreground ">
					{auth?.profile?.name}
					<ChevronDown className="inline w-5 h-4" />
				</span>
			</div>

			{/* Greeting  */}
			{isBirthday ? (
				<div className="md:hidden px-3">
					<HappyBirthday />
				</div>
			) : (
				<span className=" md:hidden px-2.5 text-xs font-Poppins text-foreground  ">
					whats been up,{" "}
					<span className="text-rose-400">{auth?.profile?.name}</span>
				</span>
			)}
		</div>
	);
};

export default HomePageHeader;
