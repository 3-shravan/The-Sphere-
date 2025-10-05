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
import { ProfilePicture, Spinner } from "@/components";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, auth, globalLoading } = useAuth();

  const username = auth?.profile?.name;
  const profilePicture = auth?.profile?.profilePicture;
  const isProfile = window.location.pathname.includes(`/profile/${username}`);

  const navigate = useNavigate();

  const className = "w-4";
  const icons = [
    <GalleryVerticalEnd key="gallery" className={className} />,
    <Search key="search" className={className} />,
    <Album key="album" className={className} />,
    <BadgePlus key="badge" className={className} />,
    <UserCircleIcon key="user" className={className} />,
  ];

  return (
    <nav className="hidden md:flex p-4 flex-col justify-between max-h-screen sidebar">
      <div className="flex flex-col gap-10">
        {/* Logo */}
        <div className="flex  mt-3 px-1 items-center transition duration-200">
          <img
            src={theme === "dark" ? "/favicon.svg" : "/favicon-dark.svg"}
            alt="logo"
            width={20}
          />
          <span className="font-bold text-lg font-Gilroy ">sphere</span>
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
          className={` btn-base w-[80%]  border-[1.5px] border-emerald-500/70   ${
            isProfile && "bg-emerald-500  border-emerald-400 "
          }`}
          onClick={() => navigate(`/profile/${username}`)}
        >
          <ProfilePicture
            profilePicture={profilePicture}
            username={username}
            size="sm"
            color={true}
          />
          Profile
        </button>

        <button className="btn-base border w-[60%]" onClick={toggleTheme}>
          {theme === "dark" ? (
            <MdLightMode className="text-[2.5vh] sm:text-lg " />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
          <span className="text-muted-foreground hover:text-foreground">
            Theme
          </span>
        </button>

        <button
          className="btn-base group w-[60%] border-[1.5px] border-rose-400/40  text-rose-500"
          onClick={logout}
          disabled={globalLoading}
        >
          <BsArrowDownRightCircleFill className="text-lg rounded-full cursor-pointer transition group-hover:bg-rose-900 group-hover:scale-95 duration-200" />
          {globalLoading ? (
            <div className="w-full flex-center">
              <Spinner size="3" />
            </div>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
