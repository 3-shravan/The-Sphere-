import { Link } from "react-router-dom";
import { useAuth } from "@context";
import { useTheme } from "@/context";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ProfilePicture, Spinner } from "@/components";

const PhoneHeader = () => {
  const { auth, logout, globalLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky z-50 md:hidden bg-background w-full">
      <div className="flex-between py-2 pl-3 p-2 items-center">
        {/*  Logo */}
        <div className="flex items-center ">
          <Logo theme={theme} />
        </div>

        <div className="flex items-center gap-x-3">
          <button onClick={logout}>
            {globalLoading ? (
              <Spinner size="4" />
            ) : (
              <LogOut className="text-third cursor-pointer w-5 h-5" />
            )}
          </button>

          <ToggleTheme theme={theme} toggleTheme={toggleTheme} />

          <ProfilePicture
            profilePicture={auth?.profile?.profilePicture}
            username={auth?.profile?.name}
            size="md"
          />
        </div>
      </div>
    </header>
  );
};

export default PhoneHeader;

const Logo = ({ theme }) => (
  <Link to="/" className="flex items-center">
    {theme === "dark" ? (
      <img src="/favicon.svg" alt="logo" width={18} />
    ) : (
      <img src="/favicon-dark.svg" alt="logo" width={18} />
    )}
    <span className="font-bold font-Poppins tracking-tighter">sphere</span>
  </Link>
);

const ToggleTheme = ({ theme, toggleTheme }) => (
  <div
    className={`flex items-center w-10 h-6 border rounded-full cursor-pointer transition-colors duration-300 ${
      theme === "dark" ? "bg-muted" : ""
    }`}
    onClick={toggleTheme}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-second"
      style={{
        marginLeft: theme === "dark" ? "calc(100% - 22px)" : "2px",
      }}
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-black text-xs" />
      ) : (
        <MdOutlineDarkMode className="text-white text-xs" />
      )}
    </motion.div>
  </div>
);
