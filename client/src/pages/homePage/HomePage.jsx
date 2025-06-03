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
      <div className="flex-between md:py- 1 md:mt-1 pt-2 ">
        <Time />
        <WhatsBeenUp auth={auth} />
        <Profile auth={auth} navigate={navigate} />
      </div>

      <div className="md:flex md:justify-center">
        <Feed />
        <section className="hidden lg:flex flex-col gap-3 p-4 rounded  w-full">
          <SuggestedUsers />
          <ChatList />
        </section>
      </div>
    </div>
  );
};

export default HomePage;

const Profile = ({ auth, navigate }) => (
  <div
    className="hidden md:flex items-center  cursor-pointer tracking-tight rounded px-7 py-2 "
    onClick={() => navigate(`/profile/${auth.profile.name}`)}
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

const Stories = () => {
  const randomImages = [
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?crop=faces&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1590080876793-00b3a1c3ca38?crop=faces&fit=crop&w=100&h=100",
  ];
  return (
    <div className="font-Futura mx-4 bg-card p-3 mt-4 mb-2 rounded-full border-2 border-border text-rose-400">
      <div className="rounded-full flex flex-col overflow-y-scroll items-center gap-4 border-border">
        {randomImages.map((image, index) => (
          <img key={index} src={image} className="w-10 h-10 rounded-full" />
        ))}
      </div>
    </div>
  );
};
