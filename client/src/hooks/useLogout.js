import { useCallback } from "@lib";
import { useApi } from "@hooks";
import { removeTokenAndAuthenticated } from "@utils";

const useLogout = () => {
  const { request, loading } = useApi();

  const logout = useCallback(async () => {
    const response = await request({
      endpoint: "auth/logout",
      redirectUrl: "/login",
    });
    if (response.status === 200) {
      removeTokenAndAuthenticated();
      setAuth({
        token: null,
        isAuthenticated: false,
        profile: null,
      });
      navigate("/login", { replace: true });
    }
  }, [request]);
  return { logout, loading };
};

export default useLogout;
