import { UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sizeMap = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};
const ProfilePicture = ({
  profilePicture,
  username,
  size = "md",
  color = false,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  const sizeClass = sizeMap[size];

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="profile picture"
          className={`${sizeClass} rounded-full object-cover border-1 border-border border-full`}
        />
      ) : (
        <UserCircle2
          className={`${sizeClass} rounded-full 
        ${color ? "text-emerald-700" : "text-neutral-600"}`}
          strokeWidth={2}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
