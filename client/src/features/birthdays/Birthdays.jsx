import { ProfilePicture, SmoothScroll } from "@/components";
import { useAuth } from "@/context";
import { useSmoothScroll } from "@/hooks";
import { useGetUsers } from "@/shared/services";
import { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

const Birthdays = () => {
  const { mutateAsync, isLoading } = useGetUsers();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [todayBirthdays, setTodayBirthdays] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await mutateAsync({ query: "" });
      const fetched = data.users;
      if (auth?.profile) {
        const alreadyIncluded = fetched.some(
          (u) => u._id === auth?.profile?._id
        );
        if (!alreadyIncluded) fetched.push(auth?.profile);
      }
      setUsers(fetched);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth(); // 0-indexed

    const filtered = users.filter((user) => {
      if (!user?.dob) return false;

      const dob = new Date(user.dob);
      const dobDay = dob.getDate();
      const dobMonth = dob.getMonth();

      return dobDay === todayDay && dobMonth === todayMonth;
    });
    setTodayBirthdays(filtered);
  }, [users]);

  useSmoothScroll(".scroll");
  return (
    <SmoothScroll className="p-4 max-h-[200px] md:max-h-[140px] scroll custom-scrollbar-hide font-Poppins h-40 lg:flex flex-col w-full rounded-lg border bg-card gap-2">
      <div>
        <h2 className="text-md font-semibold px-3 text-teal-600 font-Futura mb-4">
          <FaBirthdayCake className="inline w-4 h-4" /> Today's Birthdays
        </h2>

        {todayBirthdays.length === 0 ? (
          <p className="text-xs px-3 p-2 font-semibold text-muted-foreground font-Poppins">
            No birthdays today.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 px-2">
            {todayBirthdays.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <ProfilePicture
                  profilePicture={user.profilePicture}
                  username={user.name}
                />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SmoothScroll>
  );
};

export default Birthdays;
