import React from "react";
import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import "../../assets/styles/header.css";
import { replace, useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";


const Header = () => {
  const navigate = useNavigate();
  const { menu, toggleMenu, isMenuDisabled } = useMenu()

  return (
    <div className="header">
      <motion.div
        className="sphere"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 5, ease: "linear" }}
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 4.5 }}
          className="letter"
        >
          The
        </motion.span>
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 4 }}
          className="letterDiv"
        >


          {["S", "P", "H", "E", "R", "E"].map((letter, index) => {
            return <motion.span
              key={index}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 6 + (index * 0.1) }}
              className="letters"
            >
              {letter}
            </motion.span>
          }
          )}

          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 5.5 }}
            className="letters dot"
            onClick={() => navigate('/', { replace: true })}
          >
            .
          </motion.span>
        </motion.span>
      </motion.div>
      {!isMenuDisabled &&
        <div className="nav">
          {window.location.pathname === "/" && (
            <span onClick={() => navigate("/login", { replace: true })} className="loginButton">
              Login
              {/* <span className="loginIcon">
                <CiHeart />
              </span> */}
            </span>
          )}
          <span className="menu"
            onClick={toggleMenu}
          >
            {menu ? <IoMdClose /> : <TbMenu />}
          </span>
        </div>
      }
    </div>
  );
};

export default Header;
