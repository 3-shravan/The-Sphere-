import { Activity, UserCircle2 } from "lucide-react";
import useProfile from "../hooks/useProfile";
import EditProfile from "../EditProfile";
import React from "react";
import { FollowUser } from "@/shared";
import { Button } from "@/components/ui/button";

export const ProfileCard = ({ user }) => {
  if (!user) return null;

  const fullName = user.fullName ? user.fullName : null;
  const dob = user.dob ? user.dob : null;

  const { _id, name, bio, following, profilePicture } = user;
  const { me, followersCount, followUser, isFollowing, isPending } =
    useProfile(user);

  return (
    <div className="flex flex-col items-center font-Gilroy w-full justify-center backdrop-blur-md">
      <ProfileImage profilePicture={profilePicture} name={name} />

      <div className=" flex flex-col justify-center items-center w-full text-neutral-600">
        <h2 className="text-2xl text-second font-Futura font-bold text-center ">
          {name}
        </h2>
        {fullName && <h2 className="text-base ">{fullName}</h2>}
        {dob && (
          <span className="text-xs ">{new Date(dob).toLocaleDateString()}</span>
        )}
        <div className="flex gap-2 mt-3 items-center cursor-context-menu font-bold md:text-sm text-xs">
          {/* <div>{posts.length} posts</div> */}
          followers <Activity className=" w-3 -mx-1 inline" /> {followersCount}{" "}
          <span className="text-red-200">·</span>
          following <Activity className=" w-3 -mx-1 inline" />{" "}
          {following.length}
        </div>

        {bio && (
          <span className="italic mt-2 text-foreground max-w-sm font-mono">
            “{bio}”
          </span>
        )}

        {me ? (
          <React.Fragment key="edit">
            <EditProfile user={user} />
          </React.Fragment>
        ) : (
          <React.Fragment key="actions">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 font-mono mt-4">
              <FollowUser
                userId={_id}
                isFollowing={isFollowing}
                followUser={followUser}
                isPending={isPending}
              />
              <Button
                variant="secondary"
                className="text-xs font-Gilroy font-bold cursor-pointer bg-input/20 rounded-xl"
              >
                Message
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const ProfileImage = ({ profilePicture }) => (
  <div className="flex-shrink-0">
    {profilePicture ? (
      <img
        src={profilePicture}
        alt="profile picture"
        className="w-50 h-50 rounded-full object-cover border-2 border-border shadow-md"
      />
    ) : (
      <UserCircle2 className="w-50 h-50 rounded-full text-first" />
    )}
  </div>
);
