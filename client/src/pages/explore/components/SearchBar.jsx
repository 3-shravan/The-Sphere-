import { Search } from "lucide-react";

 export const SearchBar = ({ query, setQuery }) => (
  <div className="relative w-full mt-3 ">
    <Search
      className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-300"
      size={18}
    />
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="find the one"
      className="md:w-1/2 w-full font-Gilroy placeholder:text-[12px] pl-12  py-2.5 rounded-full bg-card border border-border text-foreground placeholder-muted-foreground  shadow-xs focus:outline-none focus:ring-1 focus:ring-rose-200 transition"
    />
  </div>
);
