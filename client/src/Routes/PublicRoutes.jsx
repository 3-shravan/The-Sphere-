import { Outlet, useNavigate, useEffect } from "@lib";
import { useAuth } from "@context";
import { getToken } from "@utils";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/feeds", { replace: true });
      return;
    }
  }, [auth.token, auth.isAuthenticated, navigate]);

  return <Outlet />;
};

export default PublicRoutes;
