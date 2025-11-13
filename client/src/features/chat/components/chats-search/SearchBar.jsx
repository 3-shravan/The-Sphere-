import { Search } from "lucide-react"

export default function SearchBar({ setQuery, query }) {
  return (
    <div className="relative w-full">
      <Search className="-translate-y-1/2 absolute top-1/2 left-3 text-first" size={16} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search users"
        className="w-full rounded-full bg-black px-10 py-3 font-Gilroy text-foreground text-sm placeholder-muted-foreground shadow-sm transition placeholder:text-[12px] focus:border-0 focus:outline-none focus:ring-1 focus:ring-first"
      />
    </div>
  )
}
