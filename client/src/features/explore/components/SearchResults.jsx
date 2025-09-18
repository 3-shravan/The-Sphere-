import { AnimatePresence, motion } from "@/lib";
import { SearchedUser } from "./SearchedUser";
import { useIgnoreLenisScroll } from "@/hooks";
export const SearchResults = ({ users, loading, query, isOpen }) => {
  useIgnoreLenisScroll(".scroll");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 7 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
          className="absolute mt-4 md:w-1/2 w-full p-1 z-50 bg-background scroll max-h-[500px] overflow-y-auto font-Futura"
        >
          {loading ? (
            <p className="text-second px-5 font-Poppins m-1 text-xs py-2">
              Searching...
            </p>
          ) : (
            users.map((user) => <SearchedUser key={user._id} user={user} />)
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
