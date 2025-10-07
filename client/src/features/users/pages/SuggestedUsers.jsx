import { CircleSmall } from "lucide-react";
import { Error, Loading, SmoothScroll } from "@/components";
import { useAuth } from "@/context";
import { useState, useEffect } from "react";
import { ListUsers } from "../components/ListUsers";
import { useSmoothScroll } from "@/hooks";
import { useSuggestedUsers } from "../services";
import { useFollowUser } from "@/shared/api/useMutations";

export default function SuggestedUsers() {
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

  useSmoothScroll(".scroll");

  return (
    <SmoothScroll className="max-h-[300px] md:max-h-[215px] scroll custom-scrollbar-hide">
      <div className=" flex-col gap-2  p-2">
        {error && <Error />}
        <h2 className="px-2.5 p-2 pb-4 text-second dark:text-first tracking-tight font-Futura">
          <CircleSmall className="inline text-second" size={27} />
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
}
