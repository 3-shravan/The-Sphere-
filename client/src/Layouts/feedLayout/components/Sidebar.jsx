import { useAuth, useTheme } from "@context";
import { tabs } from "@utils";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import {
  Album,
  BadgePlus,
  GalleryVerticalEnd,
  Search,
  UserCircleIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfilePicture } from "@/components";

const Sidebar = () => {
  const { logout, auth } = useAuth();
  const username = auth?.profile?.name;
  const media = auth?.profile?.media;
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const isProfile = window.location.pathname.includes(`/profile/${username}`);

  const className = "w-4";
  const icons = [
    <GalleryVerticalEnd className={className} />,
    <Search className={className} />,
    <Album className={className} />,
    <BadgePlus className={className} />,
    <UserCircleIcon className={className} />,
  ];

  return (
    <nav className="hidden md:flex p-4 flex-col justify-between max-h-screen sidebar">
      <div className="flex flex-col gap-10">
        {/* Logo */}
        <div className="flex gap-1 mt-3 px-2 items-center transition duration-200">
          <img
            src={theme === "dark" ? "/favicon.svg" : "/favicon-dark.svg"}
            alt="logo"
            width={15}
          />
          <span className="font-bold font-Poppins">sphere</span>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col mt-6 items-start gap-6">
          {tabs.map((tab, index) => (
            <NavLink
              key={tab.label}
              to={index === 4 ? `profile/${username}` : tab.route}
              className={({ isActive }) =>
                `flex gap-2 w-full items-center cursor-pointer py-2 px-2 rounded-md text-sm font-Gilroy font-bold transition duration-100 ${
                  isActive
                    ? "bg-rose-300 text-rose-700"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {icons[index]}
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col m-2 gap-2 font-mono text-xs font-bold ">
        <button
          className={` btn-base w-[80%] border-[1.5px] border-emerald-600/20   ${
            isProfile
              ? "bg-emerald-300 text-emerald-800 border-emerald-400 "
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => navigate(`/profile/${username}`)}
        >
          <ProfilePicture
            profilePicture={media}
            username={username}
            size="sm"
            color={true}
          />
          Profile
        </button>

        <button className="btn-base border w-[60%]" onClick={toggleTheme}>
          {theme === "dark" ? (
            <MdLightMode className="text-[2.5vh]" />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
          <span className="text-muted-foreground hover:text-foreground">
            Theme
          </span>
        </button>

        <button
          className="btn-base  group w-[60%] border-[1.5px] border-rose-400/30  text-rose-400"
          onClick={logout}
        >
          <BsArrowDownRightCircleFill className="text-lg  rounded-full cursor-pointer transition group-hover:bg-rose-900 group-hover:scale-95 duration-200" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
