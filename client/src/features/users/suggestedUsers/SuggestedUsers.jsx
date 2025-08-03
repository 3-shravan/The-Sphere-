import { useFollowUser, useSuggestedUsers } from "../services";
import { CircleSmall, UserRound } from "lucide-react";
import { Error, Loading, SmoothScroll } from "@/components";
import { useAuth } from "@/context";
import { useEffect } from "react";
import { ListUsers } from "./ListUsers";
import { useState } from "react";

const SuggestedUsers = () => {
  const { data, isLoading, error } = useSuggestedUsers();
  const suggestedUsers = data?.users;

  const { auth } = useAuth();
  const currentUser = auth?.profile?._id;

  const { mutate: followUser } = useFollowUser(() => {});
  const [map, setMap] = useState({});
  useEffect(() => {
    if (suggestedUsers) {
      const newMap = {};
      suggestedUsers.forEach((user) => {
        const isFollowing = user?.followers?.some(
          (f) => f?._id === currentUser
        );
        newMap[user?._id] = isFollowing;
      });
      setMap(newMap);
    }
  }, [suggestedUsers, currentUser]);

  if (isLoading) return Loading();
  if (error) return Error();

  return (
    <SmoothScroll className="max-h-[215px]">
      <div className="hidden lg:flex flex-col gap-2  p-2">
        <h2 className="px-3 text-rose-400 dark:text-rose-300 tracking-tight font-Futura">
          <CircleSmall className="inline text-rose-400" />
          you may know
        </h2>

        <ListUsers
          users={suggestedUsers}
          followUser={followUser}
          map={map}
          setMap={setMap}
        />
      </div>
    </SmoothScroll>
  );
};

export default SuggestedUsers;
