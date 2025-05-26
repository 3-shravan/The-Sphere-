import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context";
import { tabs } from "@utils";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { useTheme } from "@/context";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState } from "react";
import {
  Album,
  BadgePlus,
  Bookmark,
  GalleryVerticalEnd,
  Search,
} from "lucide-react";

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const className = "w-4 ";
  const icons = [
    <GalleryVerticalEnd className={`${className}`} />,
    <Search className={`${className}`} />,
    <Album className={`${className}`} />,
    <BadgePlus className={`${className}`} />,
  ];

  return (
    <nav className="hidden md:flex p-4 flex-col justify-between max-w-[18vw] max-h-screen">
      <div className="flex flex-col gap-6.5">
        {/* Logo */}
        <div className="flex gap-1 mt-3 px-2 items-center transition duration-200">
          {theme === "dark" ? (
            <img src="/favicon.svg" alt="" width={15} />
          ) : (
            <img src="/favicon-dark.svg" alt="" width={15} />
          )}

          <span className="font-bold font-Poppins">sphere</span>
        </div>

        <div className="flex flex-col gap-2 items-center w-full justify-center cursor-pointer">
          {/* You can add profile logic here if needed */}
        </div>
        {/* Sidebar Links */}
        <ul className="flex flex-col mt-3 items-start gap-3">
          {tabs.map((tab, index) => (
            <li
              key={tab.label}
              className={`flex gap-2 w-full items-center cursor-pointer py-2 px-2 rounded-md text-sm font-Gilroy font-bold transition
                  ${
                    tab === selectedTab
                      ? "bg-rose-300 text-rose-700  "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              onClick={() => {
                setSelectedTab(tab);
                navigate(tab.route);
              }}
            >
              {icons[index]}
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col mb-4 mx-auto items-center ">
        <div className="flex items-center w-full duration-200 justify-between bg-muted p-1  rounded-xl">
          <button
            className="group flex items-center h-8  px-2 bg-background rounded-xl text-background "
            onClick={logout}
          >
            <BsArrowDownRightCircleFill className="text-2xl bg-accent-foreground rounded-full cursor-pointer transition group-hover:bg-crimson group-hover:scale-90 duration-200" />
            <span className="text-xs px-1 font-medium text-foreground font-Futura ">
              Logout
            </span>
          </button>

          <button
            className="ml-2 flex items-center p-1 rounded-full  text-foreground border  cursor-pointer transition hover:scale-90 duration-200"
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
