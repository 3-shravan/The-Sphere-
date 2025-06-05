import { Button } from "@/components/ui/button";
import { useSuggestedUsers } from "../services";
import { CircleSmall, UserRound } from "lucide-react";
import { ProfilePicture, Error, Loading, SmoothScroll } from "@/components";

const SuggestedUsers = () => {
  const { data, isLoading, error } = useSuggestedUsers();
  const suggestedUsers = data?.users || [];

  if (isLoading) return Loading();
  if (error) return Error();
  return (
    <SmoothScroll className="h-[215px]">
      <div className="hidden lg:flex flex-col gap-2 bg-card p-2">
        <h2 className="px-3 text-rose-400 dark:text-rose-300 tracking-tight font-Futura">
          <CircleSmall className="inline text-rose-400" />
          you may know
        </h2>

        <ListUser users={suggestedUsers} />
      </div>
    </SmoothScroll>
  );
};

export default SuggestedUsers;

const ListUser = ({ users }) => (
  <div className="flex flex-col gap-2 pb-1 ">
    {users.map((user) => (
      <div
        key={user._id}
        className="flex-between rounded-xl px-3 py-2 transition hover:bg-muted"
      >
        <div className="flex items-center gap-2">
          <ProfilePicture profilePicture={user.profilePicture} />
          <span className="text-xs font-medium font-Poppins tracking-tighter text-muted-foreground">
            {user.name}
          </span>
        </div>
        <FollowButton />
      </div>
    ))}
  </div>
);

const FollowButton = () => (
  <Button
    size="sm"
    variant="outline"
    className="text-xs font-semibold rounded-full font-Poppins hover:opacity-90"
  >
    Follow
  </Button>
);
