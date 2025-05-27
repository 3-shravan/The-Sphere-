import { Link } from "react-router-dom";
import { useAuth } from "@context";
import { useTheme } from "@/context";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="sticky top-0 z-999 md:hidden bg-card  w-full  ">
      <div className="flex justify-between items-center py-1 pl-5 pr-4 ">
        <Link to="/" className="flex gap-1 items-center">
          {theme === "dark" ? (
            <img src="/favicon.svg" alt="" width={15} />
          ) : (
            <img src="/favicon-dark.svg" alt="" width={15} />
          )}
          <span className="font-bold font-Poppins tracking-tighter">
            sphere
          </span>
        </Link>
        <div className="flex items-center gap-x-3">
          {/* Logout Button */}
          <Button
            variant="ghost"
            className="shad-button_ghost p-2"
            onClick={() => logout()}
          >
            <LogOut className="text-rose-500 w-5 h-5" />
          </Button>

          {/* Theme Toggle Switch */}
          <div
            className={`flex items-center w-10 h-5.5 border border-border rounded-full cursor-pointer
      transition-colors duration-300 ${theme === "dark" && "bg-muted"}`}
            onClick={toggleTheme}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full flex items-center justify-center shadow-md
        bg-rose-400 "
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

          {/* Profile Link */}
          <Link to={`/profile`} className="flex items-center justify-center">
            <img
              src={
                auth.profile?.profilePicture ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-6 h-6 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Header;
