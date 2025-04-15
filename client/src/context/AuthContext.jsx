import React from "react";
import { createContext } from "@lib";
import { getIsAuthenticated, getToken } from "@utils";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = React.useState({
    isAuthenticated: getIsAuthenticated() || false,
    token: getToken() || null,
    profile: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
