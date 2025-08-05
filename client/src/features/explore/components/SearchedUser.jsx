import { ProfilePicture } from "@/components";
import { useNavigate } from "react-router-dom";
export const SearchedUser = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-full px-4 py-2 cursor-pointer rounded-3xl hover:bg-muted transition"
      onClick={() => navigate(`/profile/${user?.name}`)}
    >
      <div className=" flex gap-2 ">
        <ProfilePicture profilePicture={user.profilePicture} />
        <h3 className="font-medium text-foreground text-sm">{user.name}</h3>
      </div>
      <span className="text-[8px] px-9 font-bold font-Gilroy uppercase text-muted-foreground">
        Followers-{user.followers.length}
      </span>
    </div>
  );
};
