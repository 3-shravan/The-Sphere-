import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const SearchedUser = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-full px-4 py-2 cursor-pointer rounded-3xl hover:bg-muted transition"
      onClick={() => navigate(`/profile/${user?.name}`)}
    >
      <div className=" flex gap-2 ">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border "
          />
        ) : (
          <UserRound className="w-5 ml-1 mr-2 text-rose-300" />
        )}
        <h3 className="font-medium text-foreground text-sm">{user.name}</h3>
      </div>
      <span className="text-[8px] px-9 font-bold font-Gilroy uppercase text-muted-foreground">
        Followers-{user.followers.length}
      </span>
    </div>
  );
};
