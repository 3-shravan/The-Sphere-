import React from "react";
import { createContext } from "@lib";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = React.useState(false);
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ menu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => React.useContext(MenuContext);
