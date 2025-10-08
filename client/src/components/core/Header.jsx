import { useNavigate } from "react-router-dom";
import { useMenu } from "@/context";

export default function Header() {
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate("/", { replace: true });
          }
        }}
      />

      <nav className="flex flex-wrap items-center justify-end gap-4 w-1/2 sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-1/3">
        <button
          type="button"
          onClick={toggleMenu}
          //  onKeyDown={(e) => {
          //    if (e.key === "Enter" || e.key === " ") {
          //      toggleMenu();
          //    }
          //  }}
          className="cursor-pointer text-white text-xs md:text-xs uppercase transition-colors duration-200 hover:text-neutral-400"
        >
          {menu ? "Close" : "Menu"}
        </button>
      </nav>
    </header>
  );
}
