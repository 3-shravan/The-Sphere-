import clsx from "clsx";
import { positionClasses } from "@/utils";

export default function Backdrop({
	fn,
	children,
	image = null,
	position = "top-left",
	alt = "Image",
}) {
	return (
		<div
			onClick={fn}
			className={clsx(
				"absolute backdrop-blur-md bg-white/20 dark:bg-neutral-800/30 text-sm p-1 rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm",
				positionClasses[position],
			)}
		>
			<div className="flex items-center gap-1 px-0.5">
				{image && (
					<img
						src={image}
						alt={alt}
						className="w-6 h-6 rounded-full object-cover"
					/>
				)}
				<span className="font-Gilroy font-thin text-xs">{children}</span>
			</div>
		</div>
	);
}
