import React, { useState, useEffect } from "react";
import { createContext } from "@lib";
import { getIsAuthenticated, getToken } from "@utils";
import { Loader } from "@/components";
import { errorToast, removeTokenAndAuthenticated } from "@/utils";
import { useApi } from "@/hooks";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated(),
    token: getToken(),
    profile: JSON.parse(localStorage.getItem("profile")),
  }));
  const [loading, setLoading] = useState(false);
  const { request } = useApi();
  const token = getToken();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const { data } = await request({ endpoint: "auth/profile" });
        setAuth({
          isAuthenticated: true,
          token,
          profile: data?.user,
        });
      } catch (error) {
        removeTokenAndAuthenticated();
        setAuth({ isAuthenticated: false, token: null, profile: null });
        Navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      const response = await request({ endpoint: "auth/logout" });
      removeTokenAndAuthenticated();
      setAuth({
        isAuthenticated: false,
        token: null,
        profile: null,
      });
      Navigate("/login");
      errorToast(response?.data?.message);
    } catch (error) {
      errorToast("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
