import React from "react";
import { Outlet, useNavigate } from "@lib";
import { useAuth } from "@context";
import { Loader } from "@components";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  React.useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login", { replace: true });
  }, [auth.isAuthenticated, navigate]);

  return auth.isAuthenticated ? <Outlet /> : <Loader />;
};
export default ProtectedRoutes;
