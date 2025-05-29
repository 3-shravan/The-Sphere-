import { Button } from "@/components/ui/button";
import { useSuggestedUsers } from "../services";
import { CircleSmall, UserRound } from "lucide-react";
import { useSmoothScroll } from "@/hooks";
import { showError, showLoading } from "@/components";

const SuggestedUsers = () => {
  const { data, isLoading, error } = useSuggestedUsers();
  const suggestedUsers = data?.users || [];
  useSmoothScroll(".create-native-scroll");

  if (isLoading) return showLoading();
  if (error) return showError();
  return (
    <div className="hidden lg:flex flex-col gap-2 bg-card overflow-hidden overflow-y-scroll create-native-scroll  w-full rounded-lg border-2 border-border h-[215px] p-2 ">
      <h2 className="px-3 text-rose-400 dark:text-rose-300 tracking-tight font-Futura">
        <CircleSmall className="inline text-rose-400" />
        you may know
      </h2>
      <ListUser users={suggestedUsers} />
    </div>
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
        <div className="flex items-center gap-3">
          <UserRound className="text-muted-foreground" />
          <span className="text-xs font-bold text-muted-foreground">
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
