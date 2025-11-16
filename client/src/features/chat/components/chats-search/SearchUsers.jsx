import { useEffect, useState } from "react"
import { HandleClickOutsideWrapper } from "@/components/wrappers/HandleClickOutsideWrapper"
import useToggle from "@/hooks/util/useToggle"
import { useSearch } from "../../api/useMutations"
import SearchBar from "./SearchBar"
import ShowSearchedUsers from "./ShowSeachedUsers"

export default function SearchUsers() {
  const [isDropdownOpen, setDropdown] = useToggle()
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])
  const { mutateAsync: search } = useSearch(query)

  useEffect(() => {
    async function find() {
      if (!query) return setUsers([])
      const res = await search({ query })
      setUsers(res?.users)
      setDropdown(true)
    }
    find()
  }, [search, setDropdown, query])

  return (
    <div className="relative w-full p-1.5">
      <HandleClickOutsideWrapper onClickOutside={() => setDropdown(false)}>
        <div className="relative w-full">
          <SearchBar query={query} setQuery={setQuery} />

          {query && isDropdownOpen && <ShowSearchedUsers users={users} />}
        </div>
      </HandleClickOutsideWrapper>
    </div>
  )
}
