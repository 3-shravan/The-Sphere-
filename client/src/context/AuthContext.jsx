import { useState, useEffect, useContext, createContext } from "react";
import {
  getIsAuthenticated,
  getToken,
  removeTokenAndAuthenticated,
} from "@/utils";
import { useApi, useErrorToast, useSocket, useSuccessToast } from "@/hooks";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated() ?? false,
    token: getToken() || null,
    profile: null,
  }));

  useSocket(auth?.profile?._id);
  const token = getToken();
  const { request, loading } = useApi();

  const resetAuth = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      profile: null,
    });
    removeTokenAndAuthenticated();
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

  const today = new Date();
  const dob = new Date(auth?.profile?.dob) || null;
  const isBirthday =
    today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth();

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user: auth?.profile,
        currentUserId: auth?.profile?._id,
        logout,
        isBirthday,
        globalLoading: loading,
      }}
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
