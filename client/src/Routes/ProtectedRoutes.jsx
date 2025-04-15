import { Outlet, useNavigate, useEffect } from "@lib";
import { useApi } from "@hooks";
import { useAuth } from "@context";
import { Loader } from "@components";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { execute, loading, error } = useApi("/profile", "GET", "/feeds");

  useEffect(() => {
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
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
      }
    };

    fetchProfile();
  }, [auth.isAuthenticated, auth.token, navigate]);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
