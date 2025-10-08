import { BirthdayListItem } from "./BirthdayListItem";

export const TodayBirthdaysList = ({ users }) => {
	if (!users || users.length === 0) {
		return (
			<p className="text-xs px-3.5 font-semibold text-foreground font-Poppins">
				No birthdays today.
			</p>
		);
	}
	return (
		<ul className="flex flex-col gap-2 px-2">
			{users.map((user) => (
				<BirthdayListItem key={user._id} user={user} />
			))}
		</ul>
	);
};
