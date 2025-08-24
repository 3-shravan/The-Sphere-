import { ChevronDown, UserRound } from "lucide-react";

const HomePageHeader = ({ auth, navigate }) => {
  return (
    <div className="flex-between md:py- 1 md:mt-1 pt-2 ">
      {/* TIME  */}
      <span className="px-6 text-xs font-blackout hidden tracking-widest md:block text-second">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      {/* PROFILE */}
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
          <UserRound className="text-second  w-4" />
        )}
        <span className="font-Poppins text-sm font-bold  px-2 text-foreground ">
          {auth?.profile?.name}
          <ChevronDown className="inline w-5 h-4" />
        </span>
      </div>

      {/* Phone Header Line  */}
      <span className=" md:hidden px-2.5 text-xs font-Poppins text-foreground  ">
        whats been up,{" "}
        <span className="text-indigo-200">{auth?.profile?.name}</span>
      </span>
    </div>
  );
};

export default HomePageHeader;
