import { Search } from "lucide-react";

export const SearchBar = ({ query, setQuery }) => (
  <div className="relative w-full mt-3 ">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-first"
      size={16}
    />
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="find the one"
      className="md:w-1/2 w-full font-Gilroy text-sm placeholder:text-[12px] px-10 py-3 rounded-full bg-card  text-foreground placeholder-muted-foreground shadow-sm focus:outline-none focus:border-0 focus:ring-1 focus:ring-first transition"
    />
  </div>
);
