import { cn } from "@/lib/utils";

function Textarea({ className, variant = "default", ...props }) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content  w-full rounded-md border text-xs bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				variant === "outlined" && "border-2 border-gray-500",
				variant === "filled" && "bg-gray-200 dark:bg-gray-700",
				variant === "reply" &&
					"flex-1 custom-scrollbar-hide resize-none h-10 font-bold placeholder:font-light font-Gilroy rounded-full px-3 py-1 md:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
