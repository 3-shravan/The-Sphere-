import { Button } from "@/components/ui/button";
import { useSuggestedUsers } from "../services";
import { CircleSmall, UserRound } from "lucide-react";
import { useSmoothScroll } from "@/hooks";

const SuggestedUsers = () => {
  const { data, isLoading, error } = useSuggestedUsers();
  const suggestedUsers = data?.users || [];
  useSmoothScroll(".create-native-scroll");

  return (
    <div className="hidden overflow-hidden overflow-y-scroll mx-auto create-native-scroll lg:flex flex-col w-[30vw] h-[33vh] rounded-lg border-2 bg-card border-border lg:p-2 gap-2">
      <h2 className="px-3 text-rose-300 tracking-tight font-Futura">
        <CircleSmall className="inline text-rose-400" />
        you may know
      </h2>
      <div className="flex flex-col gap-2 create-native-scroll overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted/50 scrollbar-track-transparent">
        {suggestedUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <UserRound className="text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground">
                {user.name}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-semibold rounded-full font-Poppins hover:opacity-90"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
