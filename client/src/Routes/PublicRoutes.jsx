import { Outlet, useNavigate, useEffect } from "@lib";
import { useAuth } from "@context";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.token === "undefined" && auth.isAuthenticated) {
      navigate("/feeds", { replace: true });
      return;
    }
  }, [auth.isauthenticated, navigate]);

  return <Outlet />;
};

export default PublicRoutes;
