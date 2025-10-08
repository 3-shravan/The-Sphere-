import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateToLocalISO } from "@/utils";

const DateOfBirth = ({ dob, setDob }) => {
	const INITIAL_DATE = dob ? new Date(dob) : null;
	const [date, setDate] = useState(INITIAL_DATE);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (date) setDob(formatDateToLocalISO(date));
	}, [date, setDob]);

	return (
		<div className="flex flex-col gap-1 mt-1.5">
			<Label htmlFor="dob" className="px-1 text-xs text-muted-foreground">
				Birthday
			</Label>

			<Popover open={open} onOpenChange={setOpen} modal={true}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="dob"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : "Select date"}
						<ChevronDownIcon className="ml-2 h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0 bg-card"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date}
						onSelect={(selectedDate) => {
							if (selectedDate) {
								setDate(selectedDate);
								setOpen(false);
							}
						}}
						captionLayout="dropdown"
						fromYear={1900}
						toYear={new Date().getFullYear()}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateOfBirth;
