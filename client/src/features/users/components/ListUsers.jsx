import { ProfilePicture } from "@/components";
import { Link } from "react-router-dom";
import { FollowButton } from "./FollowButton";

export const ListUsers = ({ users, followUser, map, setMap }) => {
  if (!users || users.length === 0)
    return (
      <div className="font-Gilroy px-5 py-2">
        NO SUGGESTED USER
        <span className="inline-block text-muted-foreground/60 text-xs">
          maybe you know everyone already 🗽
        </span>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 pb-1">
      {users.slice(0, 20).map((user) => (
        <div
          key={user._id}
          className="flex-between rounded-xl px-3 py-1 cursor-pointer transition hover:bg-muted"
        >
          <Link
            to={`/profile/${user.name}`}
            className="flex items-center gap-2 w-full"
          >
            <ProfilePicture
              profilePicture={user.profilePicture}
              username={user.name}
            />
            <span className="text-sm font-medium font-Poppins tracking-tighter text-card-foreground">
              {user.name}
            </span>
          </Link>
          <FollowButton
            userId={user._id}
            followUser={followUser}
            isFollowing={map[user._id]}
            setMap={setMap}
          />
        </div>
      ))}
    </div>
  );
};
