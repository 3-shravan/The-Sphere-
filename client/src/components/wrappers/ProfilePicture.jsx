import { useNavigate } from "react-router-dom";

const sizeMap = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
  32: "w-32 h-32",
};
const ProfilePicture = ({
  profilePicture,
  username,
  alt = "Profile",
  size = "md",
  color = false,
  firstLetter = false,
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
          alt={alt}
          className={`${sizeClass} rounded-full object-cover border-1 border-border border-full`}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full border-2 border-first bg-gradient-to-r from-rose-300 to-rose-400 flex items-center justify-center text-muted text-xs font-Futura font-bold`}
        >
          {username?.[0]?.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;

export function FirstLetterProfilePicture({ profilePicture, username }) {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-r from-rose-300 to-rose-400 flex items-center justify-center text-muted text-xs font-Futura font-bold">
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>
  );
}
