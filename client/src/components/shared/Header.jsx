import "@styles/header.css";
import { useMenu } from "@context";
import {
  useNavigate,
  IoMdClose,
  motion,
  TbMenu,
  RiLoginCircleFill,
} from "@lib";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
};

const letterVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
};

const Header = () => {
  const navigate = useNavigate();
  const { menu, toggleMenu } = useMenu();

  return (
    <div className="header">
      <motion.div className="sphere">
        <img
          src="favicon-dark.svg"
          alt=""
          className="logo"
          onClick={() => navigate("/", { replace: true })}
        />
        <motion.span
          className="sphere-letters"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          onClick={() => navigate("/", { replace: true })}
        >
          {["S", "p", "h", "e", "r", "e"].map((letter, index) => (
            <motion.span key={index} variants={letterVariants}></motion.span>
          ))}
        </motion.span>
      </motion.div>

      <div className="nav">
        {!menu && window.location.pathname === "/" && (
          <>
            <div
              onClick={() => navigate("/login", { replace: true })}
              className="nav-buttons"
            >
              <span className="nav-icons">
                <RiLoginCircleFill color="grey" />
              </span>
              <button className="login-button">Login</button>
            </div>
            <div
              onClick={() => navigate("/signup", { replace: true })}
              className="nav-buttons"
            >
              <button className="signup-button">Signup</button>
            </div>
          </>
        )}
        <span className="menu" onClick={toggleMenu}>
          {menu ? "Close" : "Menu"}
        </span>
      </div>
    </div>
  );
};

export default Header;
