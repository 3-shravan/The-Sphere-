import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // Removed unused state variable
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="relative w-full h-full flex overflow-hidden">
      {/* Custom cursor */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-999 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${cursorPosition.x - 16}px, ${
            cursorPosition.y - 16
          }px) scale(${isHovering ? 1.5 : 1})`,
          background: "white",
          opacity: 0.8,
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 md:opacity-6 opacity-3 pointer-events-none z-999"
        style={{
          backgroundImage: `url("https://www.hover.dev/black-noise.png")`,
        }}
      />

      <div
        className="relative z-20 w-full flex flex-col-reverse items-center justify-center gap-10 px-4 py-8 
            md:flex-row md:items-end md:justify-between md:px-10 md:py-10 overflow-hidden"
        // style={{
        //   background:
        //     "linear-gradient(to bottom, #000000, #0a0a1a, #0f0f2d, #000000)",
        //   boxShadow: "0 0 40px rgba(0, 0, 255, 0.1) inset",
        // }}
      >
        <div
          className="flex flex-col items-center justify-center w-full p-4 gap-8 
                md:items-start md:justify-end md:w-1/2 md:space-y-0"
        >
          {/* Left column - Branding and CTA */}
          <div
            className="flex flex-col items-center w-full space-y-6 
                  sm:w-4/5 md:items-start md:w-1/2"
          >
            <h2
              className="text-4xl text-center uppercase font-bold text-white tracking-tight leading-tighter 
                   sm:text-5xl md:text-left md:text-7xl lg:text-8xl"
            >
              to grow fast.
            </h2>

            <div
              className="inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Link
                to={"/signup"}
                className="relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3 overflow-hidden font-medium transition-all bg-transparent border border-white/30 rounded-md group"
              >
                <span className="absolute w-full h-full bg-gradient-to-br from-violet-600 via-neutral-900 to-teal-800 opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative text-white text-4xl sm:text-6xl uppercase font-[Poppins] font-bold">
                  Start <span className="text-violet-500 ">Fast</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section - Collaboration message and social links */}
        <div
          className="flex flex-col items-center justify-center w-full p-4 gap-8 
                md:items-end md:justify-end md:w-1/2"
        >
          <div className="text-center px-4 sm:px-6 md:px-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl  leading-8 uppercase text-violet-400 mb-6 md:mb-8 font-Poppins font-bold">
              Drop us a line or two, we are open for creative minds.
            </h3>

            <div
              className="inline-block relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-neutral-900 to-teal-800 rounded-lg blur-lg opacity-75 group-hover:opacity-100 group-hover:bg-white transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              <Link
                href="#"
                className="relative px-4 py-3 sm:px-6 sm:py-4 bg-black/90 leading-none flex items-center
                   border border-white/10 rounded-md group"
              >
                <span className="text-sm sm:text-base md:text-lg font-bold text-violet-400 flex gap-2 items-center justify-center uppercase font-[Poppins]">
                  <img src="/favicon.svg" alt="" className="w-4 sm:w-5" />
                  Get Sphere{" "}
                  <span className="text-white text-xs font-extralight">
                    (soon)
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {label}
    </Link>
  );
}

function SocialLink({ href, icon, label }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
export default Footer;
