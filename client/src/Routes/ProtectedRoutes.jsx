import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { execute, loading ,error } = useApi("/profile", "GET", "/feeds");

  React.useEffect(() => {
    if (auth.token === "undefined" || !auth.isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      const response = await execute();
      if (response.status === 200) {
        setAuth((prev) => ({
          ...prev,
          profile: response.data.user,
        }));
      }else{
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
      }

    };

    fetchProfile();
  }, [auth.isAuthenticated, auth.token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
