import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../index";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className=" z-50 flex justify-between items-center w-full fixed bottom-0 rounded-t-2xl bg-dark-2 px-5 py-4 md:hidden">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500 "
            } flex items-center justify-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert brightness-0 transition"}`}
            />

            <p className=" text-[10px] font-medium leading-tight text-light-2">
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
