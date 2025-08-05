import axios from "axios";
import { getToken } from "@utils";

const BASE_URL =
  import.meta.env.VITE_LOCAL_SERVER_URL ||
  import.meta.env.VITE_PRODUCTON_SERVER_URL ||
  "http://localhost:8000/api/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.warn("Unauthorized or Forbidden - possibly invalid token");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      const errorMessage =
        error.response?.data?.message ||
        "Session expired, please log in again.";
      removeTokenAndAuthenticated();
      const { logout } = useAuth();
      logout();
      toast.error(errorMessage);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
