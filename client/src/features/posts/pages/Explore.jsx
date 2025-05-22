import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/users?search=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="flex flex-1 h-full">
      <div className="flex flex-col w-full  gap-6 md:gap-10  overflow-y-scroll create-native-scroll  flex-1 py-2 pb-20 px-5 md:px-8 lg:py-6 lg:px-10">
        <h2 className=" text-2xl md:font-bold md:leading-tight md:tracking-tighter font-Futura font-bold text-left w-full">
          Explore
        </h2>
        {/* Search Input */}
        <div className="relative  w-full ">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="find the one"
            className="md:w-1/2 w-full font-Gilroy text-xs pl-10 placeholder:uppercase pr-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 shadow focus:outline-none focus:ring-1 focus:ring-violet-200 transition"
          />
        </div>

        {/* Dropdown Results */}
        <AnimatePresence>
          {(loading || users.length > 0 || search) && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute mt-30 z-50 pr-5  bg-muted border-1 border-border rounded-3xl  overflow-hidden"
            >
              <div className=" max-h-80 rounded-2xl px-3 text-sm font-Gilroy overflow-y-auto custom-scrollbar">
                {loading ? (
                  <p className="text-neutral-500 py-2 dark:text-neutral-400">
                    Searching...
                  </p>
                ) : users.length === 0 && search ? (
                  <p className="text-neutral-500 py-2 dark:text-neutral-400">
                    No users found.
                  </p>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-2 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                      <img
                        src={
                          user.profilePicture ||
                          "/assets/icons/profile-placeholder.svg"
                        }
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border "
                      />
                      <div>
                        <h3 className="font-medium text-neutral-800 dark:text-neutral-100">
                          {user.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Explore;
