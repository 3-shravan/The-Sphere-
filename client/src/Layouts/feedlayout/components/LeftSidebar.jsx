import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context";
import { sidebarLinks } from "../index";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { useTheme } from "@/context";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

export const LeftSidebar = () => {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { bio, name, profilePicture } = auth?.profile || {};

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <nav className="hidden md:flex p-4 flex-col bg-background justify-between max-w-[16vw] max-h-screen">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-1 px-2 items-center">
          <img src="" alt="" width={15} />
          <span className="font-bold "></span>
        </Link>

        <div
          className="flex flex-col gap-2 items-center w-full justify-center cursor-pointer"
          onClick={() => handleNavigation("/profile")}
        >
          {" "}
          <div className="flex flex-col items-center font-mono justify-center">
            Hello,
          </div>
          <Button className="rounded-full py-0 ps-0 font-mono font-bold">
            <div className="flex aspect-square h-full p-1">
              <img
                className="h-auto w-full rounded-full"
                src={profilePicture || "/assets/icons/profile-placeholder.svg"}
                alt="Profile image"
                width={24}
                height={24}
              />
            </div>
            @{name}
          </Button>
        </div>

        <ul className="flex flex-col items-start gap-1">
          {sidebarLinks.map((link) => (
            <li
              key={link.label}
              className={`rounded-lg text-base font-Futura transition cursor-pointer ${
                pathname === link.route
                  ? "text-white"
                  : "text-foreground hover:text-muted"
              }`}
              onClick={() => handleNavigation(link.route)}
            >
              <div className="flex gap-3 items-center p-3">
                <img src={link.imgURL} alt={link.label} className="w-5 h-6" />
                {link.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col p-2 mx-auto items-center gap-2">
        <div className="flex items-center w-full duration-200 justify-between bg-neutral-800 px-1 py-1 rounded-full">
          <button
            className="group flex items-center h-8 rounded-full px-2 hover:bg-dark-100 text-crimson"
            onClick={logout}
          >
            <BsArrowDownRightCircleFill className="text-xl" />
            <span className="text-xs font-Gilroy ml-1">Logout</span>
          </button>

          <button
            className="ml-2 flex items-center h-8 rounded-full bg-foreground text-background px-2"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MdLightMode className="text-lg" />
            ) : (
              <MdDarkMode className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
