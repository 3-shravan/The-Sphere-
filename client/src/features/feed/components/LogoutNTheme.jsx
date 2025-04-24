import React from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import useLogout from "../../../hooks/useLogout";
import { useTheme } from "../../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const LogoutNTheme = () => {
  const { logout } = useLogout();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className=" flex items-center h-10 p-2 justify-end gap-2 w-full">
      <button
        className=" rounded-full h-7.75 text-[2rem] bg-[var(--dark-100)] text-[var(--color-primary)] hover:bg-[var(--dark-100)] hover:text-[var(--dark-300)]   "
        onClick={() => logout()}
      >
        <BsArrowDownRightCircleFill />
      </button>

      <button
        className=" rounded-full px-2 py-2 h-8 bg-[var(--font)] text-[var(--bg)]  hover:bg-[var(--font)] hover:text-[var(--dark-300)]   "
        onClick={() => toggleTheme()}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default LogoutNTheme;
