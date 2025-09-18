import { Button } from "@/components/ui/button";

const FollowUser = ({ userId, followUser, isFollowing, isPending }) => {
  return (
    <Button
      onClick={() => followUser(userId)}
      variant="secondary"
      // disabled={isPending}
      className="text-sm cursor-pointer bg-rose-400 border disabled:opacity-50"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowUser;
