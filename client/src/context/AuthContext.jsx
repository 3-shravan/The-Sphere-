import { useState, useEffect, useContext, createContext } from "react";
import {
  getIsAuthenticated,
  getToken,
  errorToast,
  removeTokenAndAuthenticated,
} from "@utils";
import { useApi, useErrorToast, useSuccessToast } from "@/hooks";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/core/States";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated() ?? false,
    token: getToken() || null,
    profile: null,
  }));

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const { request, loading } = useApi();
  const token = getToken();
  const currentUserId = auth?.profile?._id;

  const resetAuth = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      profile: null,
    });
    removeTokenAndAuthenticated();
    // navigate("/login");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return resetAuth();
      try {
        const { data } = await request({ endpoint: "auth/profile" });
        setAuth({
          isAuthenticated: true,
          token,
          profile: data?.user,
        });
      } catch (error) {
        useErrorToast(error, "Failed to fetch user profile");
        resetAuth();
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      const response = await request({ endpoint: "auth/logout" });
      resetAuth();
      useSuccessToast(response, "Logged out 😢");
    } catch (error) {
      useErrorToast(error, "Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, currentUserId, logout, globalLoading: loading }}
    >
      {/* <LoadingScreen show={loading} /> */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
};
