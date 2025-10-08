import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { infoToast, validateThoughtsForm } from "@/utils";
import { useCreateThought } from "../services";

const Thoughts = () => {
	const [thoughts, setThoughts] = useState("");
	const { mutateAsync, isPending } = useCreateThought();

	const submitHandler = () => {
		const error = validateThoughtsForm(thoughts);
		if (error) {
			infoToast(error);
			return;
		}
		mutateAsync({ thoughts });
		setThoughts("");
	};

	return (
		<div className="w-full p-3 font-Poppins rounded-2xl">
			<textarea
				className="resize-none h-18 w-full rounded-2xl p-4 text-xs bg-card focus-visible:ring-1 outline-hidden focus-visible:ring-emerald-400 placeholder:text-neutral-600/80 dark:placeholder:text-muted-foreground/50 placeholder:font-Futura font-bold "
				placeholder="have thoughts 🗽"
				onChange={(e) => setThoughts(e.target.value)}
				value={thoughts}
			/>

			<Button
				className="w-full rounded-lg text-xs gap-1 hover:scale-[1.01] cursor-pointer transition duration-300 mt-2 py-2 flex items-center justify-center font-Futura text-black border bg-emerald-500"
				type="submit"
				variant="ghost"
				onClick={submitHandler}
				disabled={isPending}
			>
				{isPending ? "Posting..." : "Post"}
				<BiSend className="inline w-4 h-4" />
			</Button>
		</div>
	);
};

export default Thoughts;
