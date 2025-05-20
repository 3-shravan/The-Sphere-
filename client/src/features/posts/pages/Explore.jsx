import React, { useEffect, useState } from "react";
import axios from "axios";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users based on search input
  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/users?search=${search}` , {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        console.log(data)
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500); // debounce search
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className=" mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for users..."
          className="w-full text-lg px-6 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading && <p className="text-neutral-500">Searching...</p>}

        {!loading && users.length === 0 && search && (
          <p className="text-neutral-500">No users found.</p>
        )}

        {!loading &&
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow"
            >
              <img
                src={
                  user.profilePicture ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border border-violet-300 dark:border-violet-700"
              />
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {user.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;
