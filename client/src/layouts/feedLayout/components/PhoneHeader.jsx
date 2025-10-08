import { useAuth } from "@context";
import { motion } from "framer-motion";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ProfilePicture, Spinner } from "@/components";
import { useTheme } from "@/context";

const PhoneHeader = () => {
	const { auth, logout, globalLoading } = useAuth();
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="sticky z-50 md:hidden bg-background w-full">
			<div className="flex-between py-2 pl-3 p-2 items-center">
				{/*  Logo */}
				<div className="flex items-center ">
					<Logo theme={theme} />
				</div>

				<div className="flex items-center gap-x-3 px-2">
					<button onClick={logout}>
						{globalLoading ? (
							<Spinner size="4" />
						) : (
							<RiLogoutCircleRFill className="text-third cursor-pointer w-6 h-6" />
						)}
					</button>

					<ToggleTheme theme={theme} toggleTheme={toggleTheme} />

					<ProfilePicture
						profilePicture={auth?.profile?.profilePicture}
						username={auth?.profile?.name}
						size="md"
					/>
				</div>
			</div>
		</header>
	);
};

export default PhoneHeader;

const Logo = ({ theme }) => (
	<Link to="/" className="flex items-center">
		{theme === "dark" ? (
			<img src="/favicon.svg" alt="logo" width={18} />
		) : (
			<img src="/favicon-dark.svg" alt="logo" width={18} />
		)}
		<span className="font-bold font-Poppins tracking-tighter">sphere</span>
	</Link>
);

const ToggleTheme = ({ theme, toggleTheme }) => (
	<div
		className={`flex items-center w-10 h-6 border rounded-full cursor-pointer transition-colors duration-300 ${
			theme === "dark" ? "bg-muted/50" : ""
		}`}
		onClick={toggleTheme}
	>
		<motion.div
			layout
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			className="w-4 h-4 rounded-full flex items-center justify-center "
			style={{
				marginLeft: theme === "dark" ? "calc(100% - 20px)" : "3px",
			}}
		>
			{theme === "dark" ? (
				<MdDarkMode className="text-sm" />
			) : (
				<MdOutlineLightMode className=" text-xs" />
			)}
		</motion.div>
	</div>
);
