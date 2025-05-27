import { useMenu } from "@context";
import { useNavigate } from "@lib";

const Header = () => {
  const navigate = useNavigate();
  const { menu, toggleMenu } = useMenu();

  return (
    <header className="fixed top-0 w-full z-[999] h-[9vh] flex items-center justify-between px-4 sm:px-8">
      <img
        src="favicon-dark.svg"
        alt="Logo"
        className="cursor-pointer"
        width={30}
        onClick={() => navigate("/", { replace: true })}
      />

      <nav className="flex flex-wrap items-center justify-end gap-4 w-1/2 sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-1/3">
        {/* Uncomment these if needed */}
        {/* <div onClick={() => navigate("/login")} className="relative flex items-center justify-center">
          <button className="px-4 py-2 text-[0.65rem] font-medium uppercase tracking-wider rounded-full transition-all duration-200 ease-in-out bg-white hover:bg-gray-100">
            Login
          </button>
        </div>
        <div onClick={() => navigate("/signup")} className="relative flex items-center justify-center">
          <button className="px-4 py-2 text-[0.65rem] font-medium uppercase tracking-wider rounded-full text-red-600 hover:text-red-800 bg-white hover:bg-gray-100">
            Signup
          </button>
        </div> */}

        <span
          onClick={toggleMenu}
          className="cursor-pointer text-white text-xs md:text-xs uppercase  transition-colors duration-200 hover:text-neutral-400"
        >
          {menu ? "Close" : "Menu"}
        </span>
      </nav>
    </header>
  );
};

export default Header;
