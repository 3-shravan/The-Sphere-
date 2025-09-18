import React from "react";
import { useAuth } from "@context";
import { Loader } from "@components";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  React.useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login", { replace: true });
  }, [auth.isAuthenticated, navigate]);

  return auth.isAuthenticated ? <Outlet /> : <Loader />;
}
