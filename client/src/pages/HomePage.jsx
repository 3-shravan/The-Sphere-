import { useAuth } from "@context";
import { useNavigate } from "react-router-dom";
import { SuggestedUsers } from "@/features/users";
import { ChevronDown } from "lucide-react";
import { Feed } from "@/features/posts";
import ChatList from "@/features/Chat/ChatList";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div className="flex flex-col flex-1 overflow-hidden md:bg-muted rounded  m-3 md:border-1 md:border-border">
      <div className="flex-between md: py-1 pt-2 ">
        {/* time */}
        <span className="px-6 text-sm font-blackout hidden md:block text-rose-400">
          {" "}
          11 : 11{" "}
        </span>
        {/* Phone Heading */}
        <span className=" md:hidden px-2 text-xs font-Poppins text-foreground  ">
          whats been up,{" "}
          <span className="text-indigo-200">{auth?.profile?.name}</span>
        </span>
        {/* profile tab */}
        <div
          className="hidden md:flex cursor-pointer tracking-tight rounded px-7 py-2 "
          onClick={() => navigate("/profile")}
        >
          <img
            src={auth?.profile?.profilePicture}
            alt=""
            className="w-5 h-5 rounded-full inline "
          />
          <span className="font-Poppins text-sm font-bold  px-2 text-foreground ">
            {auth?.profile?.name}
            <ChevronDown className="inline w-5 h-4" />
          </span>
        </div>
      </div>

      <div className="lg:flex">
        <Feed />
        <div className=" hidden  rounded p-4 lg:flex flex-col gap-3 h-full ">
          <SuggestedUsers />
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
