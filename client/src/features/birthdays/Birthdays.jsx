import { useGetUsers } from "@/shared/services";
import { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

const Birthdays = () => {
  const { mutateAsync } = useGetUsers();
  const [users, setUsers] = useState([]);
  const [todayBirthdays, setTodayBirthdays] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await mutateAsync({ query: "" });
      setUsers(data.users || []);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const today = new Date();
    const filtered = users.filter((user) => {
      if (!user.dob) return false;
      const dob = new Date(user.dob);
      return (
        dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()
      );
    });
    setTodayBirthdays(filtered);
  }, [users]);

  return (
    <div className="p-4 font-Poppins lg:flex flex-col w-full rounded-lg border bg-card lg:p-4 gap-2">
      <div>
        <h2 className="text-md font-semibold px-3 text-teal-600 font-Futura mb-4">
          <FaBirthdayCake className="inline w-4 h-4" /> Today's Birthdays
        </h2>

        {todayBirthdays.length === 0 ? (
          <p className="text-xs px-3 p-2 font-semibold text-muted-foreground font-Poppins">
            No birthdays today.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 px-3">
            {todayBirthdays.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted" />
                )}
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Birthdays;
