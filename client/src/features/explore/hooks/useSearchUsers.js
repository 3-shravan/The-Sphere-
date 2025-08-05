import { useDebounce } from "@/hooks";
import { useGetUsers } from "@/shared/services";
import { useEffect, useState } from "react";

export const useSearchUsers = (query) => {
  const { mutateAsync: getUsers, isPending: loading } = useGetUsers();
  const [users, setUsers] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }
      try {
        const response = await getUsers({ query: debouncedQuery });
        setUsers(response?.users || []);
      } catch (err) {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return { users, loading };
};
