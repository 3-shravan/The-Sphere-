import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components";
import { useAuth } from "@context";
import { useTheme } from "@/context";

export const Topbar = () => {
  const navigate = useNavigate();
  const { auth ,logout} = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="sticky top-0 z-50 md:hidden bg-dark-2  w-full  ">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-1 items-center">
          <img src="favicon.svg" alt="logo" width={20} />
          <span>Sphere</span>
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => logout()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile`} className="flex justify-center items-center gap-3">
            <img
              src={
                auth.profile?.profilePicture ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-7 w-7 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
