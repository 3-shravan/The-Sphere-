import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowSvg, SignUpButtonSvg, SpinCircularTextSvg } from "@/utils/svgs";
import Gradient from "./Gradient";

export const MagnetButton = () => {
  const navigate = useNavigate();
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 1}px, ${y * 1}px)`;
  };

  const resetPosition = () => {
    const btn = btnRef.current;
    btn.style.transform = `translate(0px, 0px)`;
  };

  return (
    <div className="grid min-h-[300px] overflow-x-clip  place-content-center md:place-content  p-4">
      <button
        ref={btnRef}
        onClick={() => navigate("/signup")}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
        className="group relative grid h-[220px] w-[220px] place-content-center rounded-full border-0 border-green-200 overflow-hidden transition-all duration-300 ease-out"
      >
        <Gradient />
        {/* Background Hover Circle */}
        <div className="pointer-events-none absolute inset-0 z-0 scale-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-100" />
        {/* Arrow Icon*/}
        <div className="z-10 pointer-events-none rotate-45 absolute flex items-center justify-center h-full w-full">
          <ArrowSvg />
        </div>
        <SpinCircularTextSvg />
      </button>
    </div>
  );
};

export const SignUpButton = () => {
  return (
    <Link
      className="group flex h-15 items-center gap-2 rounded-full text-black font-bold bg-emerald-400 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700 cursor-pointer"
      to="/signup"
    >
      <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
        <SignUpButtonSvg />
      </span>
      <span className="font-thin">here we</span> SIGNUP
    </Link>
  );
};
