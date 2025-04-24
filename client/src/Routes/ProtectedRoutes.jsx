import { Outlet, useNavigate, useEffect } from "@lib";
import { useApi } from "@hooks";
import { useAuth } from "@context";
import { Loader } from "@components";
import { removeTokenAndAuthenticated } from "@utils";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { request, loading } = useApi();

  useEffect(() => {
    if (!auth.token || !auth.isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      const response = await request({
        endpoint: "auth/profile",
      });
      if (response.status === 200) {
        setAuth((prev) => ({
          ...prev,
          profile: response.data.user,
        }));
      } else {
        removeTokenAndAuthenticated();
      }
    };

    if (auth.token) fetchProfile();
  }, [auth.isAuthenticated, auth.token, navigate]);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
