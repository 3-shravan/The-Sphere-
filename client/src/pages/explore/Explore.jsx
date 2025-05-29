import { useEffect, useState } from "react";
import { useSearchUsers } from "./useSearchUsers";
import { Container, H2 } from "@/components";
import { Search, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "@/lib";
import HandleClickOutsideWrapper from "./HandleClickOutsideWrapper";
import { MdCancel } from "react-icons/md";

const Explore = () => {
  const [query, setQuery] = useState("");
  const { users, loading: isLoading } = useSearchUsers(query);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  useEffect(() => {
    if (query.trim()) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(isLoading);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading, query]);

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

const SearchBar = ({ query, setQuery }) => (
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

const SearchResults = ({ users, loading, query, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="dropdown"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          duration: 0.3,
          delay: 0.7,
        }}
        className="absolute mt-4 md:w-1/2 w-full p-1 z-50  bg-muted border border-border rounded-3xl  overflow-hidden font-Futura"
      >
        <div className=" max-h-80 rounded-2xl  text-sm  overflow-y-auto custom-scrollbar">
          {loading ? (
            <p className="text-rose-400 px-5 font-Poppins text-xs py-2">
              Searching...
            </p>
          ) : query && users.length === 0 ? (
            <span className=" py-2 text-rose-400 w-full flex gap-1 items-center px-5 font-Poppins text-xs">
              <MdCancel className="block" />
              No user found
            </span>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col w-full px-4 py-2 cursor-pointer rounded-3xl hover:bg-card transition"
              >
                <div className=" flex gap-2 ">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border "
                    />
                  ) : (
                    <UserRound className="w-5 ml-1 mr-2 text-rose-300" />
                  )}
                  <h3 className="font-medium text-foreground text-sm">
                    {user.name}
                  </h3>
                </div>
                <span className="text-[8px] px-9 font-bold font-Gilroy uppercase text-muted-foreground">
                  Followers-{user.followers.length}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
