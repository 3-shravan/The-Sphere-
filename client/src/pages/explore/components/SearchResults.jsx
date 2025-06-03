import { AnimatePresence, motion } from "@/lib";
import { SearchedUser } from "./SearchedUser";

export const SearchResults = ({ users, loading, query, isOpen }) => (
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
        className="absolute mt-4 md:w-1/2 w-full p-1 z-50  bg-card border border-border rounded-3xl  overflow-hidden font-Futura"
      >
        {loading && (
          <p className="text-rose-400 px-5 font-Poppins text-xs py-2">
            Searching...
          </p>
        )}

        {!loading && users.length === 0 && (
          <span className="py-2 text-rose-400 w-full flex gap-1 items-center px-5 font-Poppins text-xs">
            No such user
          </span>
        )}

        {!loading &&
          users.length > 0 &&
          users.map((user) => <SearchedUser key={user._id} user={user} />)}
      </motion.div>
    )}
  </AnimatePresence>
);
