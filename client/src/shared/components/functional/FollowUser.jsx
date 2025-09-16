import React from "react";
import { Button } from "@/components/ui/button";

const FollowUser = ({ userId, followUser, isFollowing, isPending }) => {
  return (
    <Button
      onClick={() => followUser(userId)}
      variant={"outline"}
      // disabled={isPending}
      className="text-sm cursor-pointer border disabled:opacity-50"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowUser;
