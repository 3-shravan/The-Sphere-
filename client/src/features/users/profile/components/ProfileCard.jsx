import { Activity } from "lucide-react";
import { useState } from "react";
import { FollowUser, ShowUserModal } from "@/shared";
import { Button } from "@/components/ui/button";
import { ProfilePicture } from "@/components";
import { Modal } from "@/components";
import useProfile from "../hooks/useProfile";
import EditProfile from "../EditProfile";

export const ProfileCard = ({ user }) => {
  if (!user) return null;
  const [activeModal, setActiveModal] = useState(null);

  const { fullName, dob, name, bio, following, followers } = user;
  const { me, followersCount, followUser, isFollowing, isPending } =
    useProfile(user);

  return (
    <div className="flex flex-col items-center font-Gilroy w-full justify-center backdrop-blur-md">
      <ProfilePicture
        profilePicture={user.profilePicture}
        username={name}
        size="profile"
      />

      <div className="flex flex-col mt-2 justify-center items-center w-full text-neutral-600">
        <h2 className="text-2xl text-second font-Futura font-bold text-center">
          {name}
        </h2>
        {fullName && <h2 className="text-base">{fullName}</h2>}
        {dob && (
          <span className="text-xs">{new Date(dob).toLocaleDateString()}</span>
        )}

        <div className="flex gap-2 mt-3 items-center cursor-pointer font-bold md:text-sm text-xs">
          <span onClick={() => setActiveModal("followers")}>
            followers <Activity className="w-3 -mx-1 inline" /> {followersCount}
          </span>
          <span className="text-red-200">·</span>
          <span onClick={() => setActiveModal("followings")}>
            following <Activity className="w-3 -mx-1 inline" />{" "}
            {following.length}
          </span>
        </div>

        {bio && (
          <span className="italic mt-2 text-foreground max-w-sm font-mono">
            “{bio}”
          </span>
        )}

        {me ? (
          <EditProfile user={user} />
        ) : (
          <div className="flex flex-wrap justify-center md:justify-start gap-3 font-mono mt-4">
            <FollowUser
              userId={user._id}
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
        )}
      </div>

      {activeModal && (
        <Modal darkModal={false}>
          <ShowUserModal
            title={activeModal === "followers" ? "Followers" : "Following"}
            users={activeModal === "followers" ? followers : following}
            onCancel={() => setActiveModal(null)}
          />
        </Modal>
      )}
    </div>
  );
};
