import { UserCircle2 } from "lucide-react";
import useProfile from "../hooks/useProfile";
import EditProfile from "../EditProfile";
import React from "react";

export const ProfileCard = ({ user }) => {
  if (!user) return null;
  const fullName = user.fullName ? user.fullName : null;
  const dob = user.dob ? user.dob : null;
  const { _id, name, bio, following, posts, profilePicture } = user;
  const { me, isFollowing, followersCount, followUser, isPending } =
    useProfile(user);

  return (
    <div className="flex flex-col items-center font-Gilroy  w-full  justify-center backdrop-blur-md">
      <ProfileImage profilePicture={profilePicture} name={name} />

      <div className=" flex flex-col justify-center items-center w-full text-neutral-600">
        <h2 className="text-2xl text-second font-Futura font-bold text-center ">
          {name}
        </h2>
        {fullName && <h2 className="text-base ">{fullName}</h2>}
        {dob && (
          <span className="text-xs ">{new Date(dob).toLocaleDateString()}</span>
        )}

        <div className="flex gap-5 mt-4 cursor-context-menu font-blackout font-bold md:text-sm text-xs">
          {/* <div>{posts.length} posts</div> */}
          <div>{followersCount} followers</div>
          <div>{following.length} following</div>
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
              <div
                className="text-sm cursor-pointer bg-white/60 dark:bg-neutral-800/50 px-3 py-1.5 rounded-xl backdrop-blur-md shadow border border-white/10 dark:border-neutral-700"
                onClick={() => !isPending && followUser(_id)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </div>
              <div className="text-sm bg-white/60 dark:bg-neutral-800/50 px-3 py-1.5 rounded-xl backdrop-blur-md shadow border border-white/10 dark:border-neutral-700">
                Message
              </div>
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
