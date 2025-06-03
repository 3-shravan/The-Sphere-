import { useEffect, useState } from "react";
import { useSearchUsers } from "./useSearchUsers";
import { Container, H2 } from "@/components";
import { HandleClickOutsideWrapper } from "./components/HandleClickOutsideWrapper";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";

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
      <main className="relative w-full ">
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
      </main>
    </Container>
  );
};
export default Explore;
