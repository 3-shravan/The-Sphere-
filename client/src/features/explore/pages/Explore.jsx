import { useEffect, useState } from "react";
import { Container, H2 } from "@/components";
import Birthdays from "@/features/birthdays/pages/Birthdays";
import SuggestedUsers from "@/features/users/pages/SuggestedUsers";
import { HandleClickOutsideWrapper } from "../components/HandleClickOutsideWrapper";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { useSearchUsers } from "../hooks/useSearchUsers";

const Explore = () => {
	const [query, setQuery] = useState("");
	const { users, loading } = useSearchUsers(query);
	const [isDropdownOpen, setIsDropdownOpen] = useState(true);

	useEffect(() => {
		if (query.trim()) {
			setIsDropdownOpen(true);
		} else {
			setIsDropdownOpen(false);
		}
	}, [query]);

	return (
		<Container>
			<H2 text={"Explore"} />
			<header className="relative w-full ">
				<HandleClickOutsideWrapper
					onClickOutside={() => setIsDropdownOpen(false)}
				>
					<SearchBar query={query} setQuery={setQuery} />
					<SearchResults
						isOpen={isDropdownOpen}
						users={users}
						loading={loading}
						query={query}
					/>
				</HandleClickOutsideWrapper>
			</header>
			{!isDropdownOpen && (
				<div className="flex flex-col gap-6 w-full lg:hidden ">
					<SuggestedUsers />
					<Birthdays />
				</div>
			)}
		</Container>
	);
};
export default Explore;
