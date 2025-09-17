import { Link, useLocation } from "react-router-dom";
import { tabs } from "@utils";
import { Album, BadgePlus, GalleryVerticalEnd, Search } from "lucide-react";

const Dock = () => {
  const { pathname } = useLocation();

  const className = "w-5";
  const icons = [
    <GalleryVerticalEnd className={`${className}`} />,
    <Search className={`${className}`} />,
    <Album className={`${className}`} />,
    <BadgePlus className={`${className}`} />,
  ];
  return (
    <section className="z-50 flex backdrop-blur-2xl items-center w-[80%] left-1/2 -translate-x-1/2  fixed bottom-4 rounded-2xl md:hidden">
      {tabs.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`dock-${link.label}`}
            to={link.route}
            className={`${
              isActive && "text-third"
            } flex-center flex-col w-full py-1.5 transition`}
          >
            {icons[index]}

            <p className=" text-[8px] font-bold font-Poppins leading-tight">
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Dock;
