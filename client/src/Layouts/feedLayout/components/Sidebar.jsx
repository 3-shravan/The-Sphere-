import { useAuth, useTheme } from "@context";
import { tabs } from "@utils";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Album, BadgePlus, GalleryVerticalEnd, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const className = "w-4";
  const icons = [
    <GalleryVerticalEnd className={className} />,
    <Search className={className} />,
    <Album className={className} />,
    <BadgePlus className={className} />,
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
        <ul className="flex flex-col mt-6 items-start gap-3">
          {tabs.map((tab, index) => (
            <NavLink
              key={tab.label}
              to={tab.route}
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
      <div className="flex flex-col mb-4 mx-auto items-center">
        <div className="flex items-center w-full duration-200 justify-between bg-muted p-1 rounded-xl">
          <button
            className="group flex items-center h-8 px-2 bg-background rounded-xl text-background"
            onClick={logout}
          >
            <BsArrowDownRightCircleFill className="text-2xl bg-accent-foreground rounded-full cursor-pointer transition group-hover:bg-crimson group-hover:scale-90 duration-200" />
            <span className="text-xs px-1 font-medium text-foreground font-Futura">
              Logout
            </span>
          </button>

          <button
            className="ml-2 flex items-center p-1 rounded-full text-foreground border cursor-pointer transition hover:scale-90 duration-200"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MdLightMode className="text-medium" />
            ) : (
              <MdDarkMode className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
