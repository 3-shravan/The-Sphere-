import { Outlet, useNavigate } from "@lib";
import { useAuth } from "@context";
import { Loader } from "@components";
import React from "react";

export default function PublicRoutes() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/feeds", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);
  return auth.isAuthenticated ? <Loader /> : <Outlet />;
}
