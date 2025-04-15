import {
  motion,
  FaUserAstronaut,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "@lib";

const textVariants = {
  initial: { opacity: 1 },
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  initial: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
};

const AnimatedText = ({ text }) => {
  return (
    <motion.span
      variants={textVariants}
      initial="initial"
      whileHover="hover"
      className="hover:text-emerald-500 cursor-pointer"
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Menu = () => {
  return (
    <motion.div
      initial={{ y: -800, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -800, opacity: 0 }}
      transition={{
        delay: 0.1,
        duration: 1,
        ease: "anticipate",
      }}
      className="relative flex flex-col justify-center items-center bg-[#131313] min-h-[100vh] w-screen text-white/35 font-[Gilroy-Medium] z-10 px-5"
    >
      <div className="flex flex-col items-center justify-center  text-center h-[65vh] ">
        <FaUserAstronaut className="text-6xl text-emerald-500 animate-pulse mb-4" />
        <div className="text-xl text-white font-bold tracking-wide drop-shadow-lg">
          developer by{" "}
          <span className="font-[Blackout-Midnight] lea">Shravan Yadav</span>
        </div>
        <p className="text-sm text-emerald-300 mt-2">
          Crafting with code & creativity
        </p>

        <div className="flex gap-6 mt-4 text-white/80">
          <a
            href="https://github.com/3-shravan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition duration-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shravan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition duration-200"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/shravan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition duration-200"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center mt-10">
        <AnimatedText text="Contact Us." />
        <AnimatedText text="About Us." />
        <AnimatedText text="Privacy Policy." />
      </div>

      <span className="absolute bottom-1 text-xs text-yellow-100">
        Copyright © 2025
      </span>
    </motion.div>
  );
};

export default Menu;
