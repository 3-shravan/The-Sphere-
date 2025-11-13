import { useAuth, useTheme } from "@context";
import { tabs } from "@utils";
import {
  Album,
  BadgePlus,
  GalleryVerticalEnd,
  // MessageSquare,
  Search,
  UserCircleIcon,
} from "lucide-react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
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
    // <MessageSquare key="message" className={className} />,
    <Album key="album" className={className} />,
    <BadgePlus key="badge" className={className} />,
    <UserCircleIcon key="user" className={className} />,
  ];

  return (
    <nav className="sidebar hidden max-h-screen flex-col justify-between p-4 md:flex">
      <div className="flex flex-col gap-10">
        {/* Logo */}
        <div className="mt-3 flex items-center px-1 transition duration-200">
          <img
            src={theme === "dark" ? "/favicon.svg" : "/favicon-dark.svg"}
            alt="logo"
            width={20}
          />
          <span className="font-Gilroy font-bold text-lg">sphere</span>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 flex flex-col items-start gap-4">
          {tabs.map((tab, index) => (
            <NavLink
              key={tab.label}
              to={index === 4 ? `profile/${username}` : tab.route}
              className={({ isActive }) =>
                `flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 font-Gilroy font-bold text-sm transition duration-100 ${
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
      <div className="m-2 flex flex-col gap-2 font-bold font-mono text-xs">
        <button
          className={`btn-base w-[80%] border-[1.5px] border-emerald-500/70 ${
            isProfile && "border-emerald-400 bg-emerald-500"
          }`}
          type="button"
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

        <button
          type="button"
          className="btn-base w-[60%] border"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <MdLightMode className="text-[2.5vh] sm:text-lg" />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
          <span className="text-muted-foreground hover:text-foreground">
            Theme
          </span>
        </button>

        <button
          className="btn-base group w-[60%] border-[1.5px] border-rose-400/40 text-rose-500"
          onClick={logout}
          type="button"
          disabled={globalLoading}
        >
          <BsArrowDownRightCircleFill className="cursor-pointer rounded-full text-lg transition duration-200 group-hover:scale-95 group-hover:bg-rose-900" />
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
