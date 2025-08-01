import { ProfilePicture } from "@/components";
import { Link } from "react-router-dom";
import { FollowButton } from "./FollowButton";

export const ListUsers = ({ users, followUser, map, setMap }) => (
  <div className="flex flex-col gap-2 pb-1 ">
    {users.map((user) => (
      <div
        key={user._id}
        className="flex-between rounded-xl px-3 py-2 cursor-pointer transition hover:bg-muted"
      >
        <Link
          to={`/profile/${user.name}`}
          className="flex items-center gap-2 w-full"
        >
          <ProfilePicture
            profilePicture={user.profilePicture}
            username={user.name}
          />
          <span className="text-xs font-medium font-Poppins tracking-tighter text-muted-foreground">
            {user.name}
          </span>
        </Link>
        <FollowButton
          userId={user?._id}
          followUser={followUser}
          isFollowing={map[user._id]}
          setMap={setMap}
        />
      </div>
    ))}
  </div>
);
