import React from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import "../../assets/styles/header.css";
import { replace, useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";
import { RiLoginCircleFill } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const { menu, toggleMenu } = useMenu();

  return (
    <div className="header">
      <motion.div
        className="sphere"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, ease: "linear" }}
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
          className="sphere-letters"
        >
          {["S", "P", "H", "E", "R", "E", "."].map((letter, index) => {
            return (
              <motion.span
                key={index}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.span>
      </motion.div>

      <div className="nav">
        {!menu && window.location.pathname === "/" && (
          <>
            <div
              onClick={() => navigate("/login", { replace: true })}
              className="nav-buttons "
            >
              {/* <img src="" alt="" /> */}
              <span className="nav-icons">
                {" "}
                <RiLoginCircleFill color="grey" />
              </span>
              <button className="login-button">Login</button>
            </div>
            <div
              onClick={() => navigate("/signup", { replace: true })}
              className="nav-buttons "
            >
              {/* <img src="" alt="" /> */}

              <button className="signup-button">Signup</button>
            </div>
          </>
        )}
        <span
          className="menu"
          onClick={() => {
            toggleMenu();
          }}
        >
          {menu ? <IoMdClose /> : <TbMenu />}
        </span>
      </div>
    </div>
  );
};

export default Header;
