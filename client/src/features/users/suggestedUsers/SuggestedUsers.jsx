import { useSuggestedUsers } from "../services";
import { CircleSmall } from "lucide-react";
import { Error, Loading, SmoothScroll } from "@/components";
import { useAuth } from "@/context";
import { useEffect } from "react";
import { useState } from "react";
import { ListUsers } from "./components/ListUsers";
import { useFollowUser } from "@/shared/services";

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
        <h2 className="px-3 text-second dark:text-first tracking-tight font-Futura">
          <CircleSmall className="inline text-second" />
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
