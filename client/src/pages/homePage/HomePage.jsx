import { useAuth } from "@context";
import { useNavigate } from "react-router-dom";
import { SuggestedUsers } from "@/features/users";
import { ChevronDown, UserRound } from "lucide-react";
import { Feed } from "@/features/posts";
import ChatList from "@/features/Chat/ChatList";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div className="flex flex-col w-full flex-1 overflow-hidden md:bg-muted rounded m-3 md:border-1 md:border-border">
      <div className="flex-between md:py-1 pt-2 ">
        <Time />
        <WhatsBeenUp auth={auth} />
        <Profile auth={auth} navigate={navigate} />
      </div>

      <div className="md:flex flex-1">
        <Feed />
        <div className="hidden lg:flex flex-col gap-3 rounded p-4  w-full">
          <SuggestedUsers />
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const Profile = ({ auth, navigate }) => (
  <div
    className="hidden md:flex items-center  cursor-pointer tracking-tight rounded px-7 py-2 "
    onClick={() => navigate("/profile")}
  >
    {auth?.profile?.profilePicture ? (
      <img
        src={auth?.profile?.profilePicture}
        alt=""
        className="w-5 h-5 rounded-full inline "
      />
    ) : (
      <UserRound className="text-rose-400  w-4" />
    )}
    <span className="font-Poppins text-sm font-bold  px-2 text-foreground ">
      {auth?.profile?.name}
      <ChevronDown className="inline w-5 h-4" />
    </span>
  </div>
);

const Time = () => (
  <span className="px-6 text-sm font-blackout hidden md:block text-rose-400">
    {new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>
);

const WhatsBeenUp = ({ auth }) => (
  <span className=" md:hidden px-2 text-xs font-Poppins text-foreground  ">
    whats been up,{" "}
    <span className="text-indigo-200">{auth?.profile?.name}</span>
  </span>
);
