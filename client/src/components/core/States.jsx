import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({ show }) {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed inset-0 flex items-center justify-center bg-background z-[9999]"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<div className="animate-spin rounded-full h-15 w-15 border-t-2 border-l-2 border-rose-500"></div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export function Spinner({ size = "6", color = "neutral-700" }) {
	return (
		<div
			className={`animate-spin rounded-full h-${size} w-${size} border-2 border-t-transparent border-${color}`}
		/>
	);
}

export function Loading({ message = "", size, spinner = true }) {
	return (
		<div className="flex-center  w-full uppercase gap-2 font-bold text-sm font-Futura">
			{spinner && <Spinner size={size} />}
			{message}
		</div>
	);
}

export function ShowError({ message = "❗ Failed to fetch" }) {
	<div className="text-center py-10 font-bold text-third">{message}</div>;
}

export function Loader() {
	return (
		<div className="absolute inset-0 w-screen h-full bg-background flex items-center justify-center overflow-hidden">
			{/* Spinner 1 */}
			<motion.div
				className="absolute -right-[535px] -bottom-[840px]"
				initial={{ rotate: 45 }}
				animate={{ rotate: -315 }}
				transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
			>
				<Spin
					text="LOADING  LOADING  LOADING  LOADING  LOADING"
					radius={800}
					fontSize="180px"
					letterSpacing={8}
				/>
			</motion.div>

			{/* Spinner 2 */}
			<motion.div
				className="absolute -right-[385px] -bottom-[695px]"
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
			>
				<Spin
					text="LOADING  LOADING  LOADING  LOADING"
					radius={650}
					fontSize="180px"
					letterSpacing={10}
				/>
			</motion.div>

			{/* Spinner 3 */}
			<motion.div
				className="absolute -right-[200px] -bottom-[510px]"
				initial={{ rotate: -5 }}
				animate={{ rotate: -365 }}
				transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
			>
				<Spin
					text="LOADING LOADING LOADING"
					radius={480}
					fontSize="180px"
					letterSpacing={15}
				/>
			</motion.div>
		</div>
	);
}
const Spin = ({ text, radius, fontSize, letterSpacing }) => {
	const characters = text.split("");
	return (
		<motion.div
			className="relative aspect-square"
			style={{ width: radius * 2 }}
		>
			<p aria-label={text} />
			<p
				aria-hidden="true"
				className="absolute left-1/2 top-0 font-bold text-[color:var(--foreground)] whitespace-nowrap mix-blend-difference"
			>
				{characters.map((ch, i) => (
					<motion.span
						key={i}
						className="absolute left-1/2 top-0 font-Gilroy font-bold"
						style={{
							transformOrigin: `0 ${radius}px`,
							transform: `rotate(${i * letterSpacing}deg)`,
							fontSize,
						}}
					>
						{ch}
					</motion.span>
				))}
			</p>
		</motion.div>
	);
};
