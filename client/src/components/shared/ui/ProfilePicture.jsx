import { UserCircle2, UserRound } from "lucide-react";

const ProfilePicture = ({ profilePicture }) => {
  return (
    <div>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="profile picture"
          className="w-8 h-8 rounded-full object-cover border-1 border-border border-full "
        />
      ) : (
        <UserCircle2 className="w-8 h-8 rounded-full text-neutral-600"  />
      )}
    </div>
  );
};

export default ProfilePicture;
