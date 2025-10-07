import { Link, useLocation } from "react-router-dom";
import { tabs } from "@/utils";
import { Album, BadgePlus, GalleryVerticalEnd, Search } from "lucide-react";

const Dock = () => {
  const { pathname } = useLocation();

  const className = "w-5";
  const icons = [
    <GalleryVerticalEnd key="gallery" className={`${className}`} />,
    <Search key="search" className={`${className}`} />,
    <Album key="album" className={`${className}`} />,
    <BadgePlus key="badge" className={`${className}`} />,
  ];
  return (
    <section className="z-50 flex backdrop-blur bg-background/40 items-center w-full left-1/2 -translate-x-1/2 fixed bottom-0 md:hidden">
      {tabs.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`${
              isActive && "text-third"
            } flex-center flex-col w-full py-2.5 md:py-4 transition`}
          >
            {icons[index]}

            {/* <p className=" text-[8px] font-bold font-Poppins leading-tight">
              {link.label}
            </p> */}
          </Link>
        );
      })}
    </section>
  );
};

export default Dock;
