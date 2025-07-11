import { Link } from "react-router-dom";
import { useAuth } from "@context";
import { useTheme } from "@/context";
import { LogOut, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-999 md:hidden bg-card w-full">
      <div className="flex-between py-1 pl-5 pr-4 items-center">
        {/*  Logo */}
        <div className="flex items-center gap-x-3">
          <Logo theme={theme} />
        </div>

        <div className="flex items-center gap-x-3">
          <Button variant="ghost" onClick={logout}>
            <LogOut className="text-rose-500 w-5 h-5" />
          </Button>

          <ToggleTheme theme={theme} toggleTheme={toggleTheme} />

          <Profile auth={auth} />
        </div>
      </div>
    </header>
  );
};

export default Header;

// Subcomponents

const Logo = ({ theme }) => (
  <Link to="/" className="flex gap-1 items-center">
    {theme === "dark" ? (
      <img src="/favicon.svg" alt="logo" width={15} />
    ) : (
      <img src="/favicon-dark.svg" alt="logo" width={15} />
    )}
    <span className="font-bold font-Poppins tracking-tighter">sphere</span>
  </Link>
);

const ToggleTheme = ({ theme, toggleTheme }) => (
  <div
    className={`flex items-center w-10 h-5.5 border border-border rounded-full cursor-pointer transition-colors duration-300 ${
      theme === "dark" ? "bg-muted" : ""
    }`}
    onClick={toggleTheme}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-rose-400"
      style={{
        marginLeft: theme === "dark" ? "calc(100% - 20px)" : "2px",
      }}
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-black text-sm" />
      ) : (
        <MdOutlineDarkMode className="text-white text-sm" />
      )}
    </motion.div>
  </div>
);

const Profile = ({ auth }) => (
  <Link
    to={`/profile/${auth?.profile?.name}`}
    className="flex items-center justify-center"
  >
    {auth?.profile?.profilePicture ? (
      <img
        src={auth.profile.profilePicture}
        alt="profile"
        className="w-5 h-5 rounded-full inline"
      />
    ) : (
      <UserRound className="text-rose-400 w-4" />
    )}
  </Link>
);
