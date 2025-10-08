import "@/styles/toast.css";
import { useEffect, useState } from "react";
import { PiHeartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useTheme } from "@/context";

export const Toast = () => {
	const { theme } = useTheme();
	const [position, setPosition] = useState("top-center");

	useEffect(() => {
		const updatePosition = () => {
			if (window.innerWidth > 1000) setPosition("bottom-right");
			else setPosition("top-center");
		};
		updatePosition();
		window.addEventListener("resize", updatePosition);
		return () => window.removeEventListener("resize", updatePosition);
	}, []);

	return (
		<Toaster
			position={position}
			duration={5000}
			theme={theme === "dark" ? "dark" : "light"}
			className="sonner-container"
		/>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const successToast = (message) =>
	toast.success(message, { className: "h-10" });

// eslint-disable-next-line react-refresh/only-export-components
export const errorToast = (message) => toast.error(message);

// eslint-disable-next-line react-refresh/only-export-components
export const infoToast = (message) =>
	toast.info(message, { className: "h-10" });

// === Small Sub-Components ===
export function ToastAvatar({ src, size = "w-10 h-10" }) {
	return (
		<img
			src={src}
			alt="profile"
			className={`${size} rounded-full object-cover`}
		/>
	);
}

export function ToastUserName({ name }) {
	return <span className="font-bold text-foreground/90 text-xs">{name}</span>;
}

export function ToastActionButton({ to, label = "View" }) {
	if (!to) return null;
	return (
		<Link
			to={to}
			className="text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide font-mono uppercase border text-foreground bg-emerald-600 hover:bg-background cursor-pointer transition-colors duration-200"
		>
			{label}
		</Link>
	);
}

export function ToastMessageText({ text, heart = false }) {
	return (
		<p className="mt-1 text-xs text-foreground flex items-center gap-1 font-Futura line-clamp-2">
			{text} {heart && <PiHeartFill className="text-third" size={15} />}
		</p>
	);
}
export function ToastMedia({ src }) {
	if (!src) return null;
	return (
		<div className="w-12 aspect-[3/4] ml-auto rounded-md overflow-hidden">
			<img src={src} alt="media" className="w-full h-full object-cover" />
		</div>
	);
}
