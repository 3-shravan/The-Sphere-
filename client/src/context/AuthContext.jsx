import { useState, useEffect, useContext } from "react";
import { createContext } from "@lib";
import {
  getIsAuthenticated,
  getToken,
  errorToast,
  removeTokenAndAuthenticated,
} from "@utils";
import { Loader } from "@/components";
import { useApi } from "@/hooks";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated(),
    token: getToken(),
    profile: null,
  }));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { request } = useApi();
  const token = getToken();

  const resetAuth = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      profile: null,
    });
    removeTokenAndAuthenticated();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return resetAuth();
      setLoading(true);
      try {
        const { data } = await request({ endpoint: "auth/profile" });
        setAuth({
          isAuthenticated: true,
          token,
          profile: data?.user,
        });
      } catch (error) {
        errorToast("Failed to fetch user profile");
        resetAuth();
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
      resetAuth();
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

export const useAuth = () => useContext(AuthContext);
