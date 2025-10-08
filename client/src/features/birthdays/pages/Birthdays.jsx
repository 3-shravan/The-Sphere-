import { FaBirthdayCake } from "react-icons/fa";
import { SmoothScroll, Spinner } from "@/components";
import { useSmoothScroll } from "@/hooks";
import { useTodaysBirthdays } from "../api/useQueries";
import { TodayBirthdaysList } from "../components/TodayBirthdayList";

export default function Birthdays() {
	const { data, isLoading } = useTodaysBirthdays();

	useSmoothScroll(".scroll");

	if (isLoading)
		return (
			<div className="flex-center">
				<Spinner />
			</div>
		);

	return (
		<SmoothScroll className="p-4 max-h-[200px] md:max-h-[140px] scroll custom-scrollbar-hide font-Poppins h-40 lg:flex flex-col w-full rounded-lg border bg-card gap-2">
			<>
				<header className="text-md font-semibold px-3 text-teal-600 font-Futura mb-4">
					<FaBirthdayCake className="inline w-4 h-4" /> Today&apos;s Birthdays
				</header>
				<TodayBirthdaysList users={data?.users} />
			</>
		</SmoothScroll>
	);
}
