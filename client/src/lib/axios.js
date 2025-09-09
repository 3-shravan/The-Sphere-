import axios from "axios";
import { getToken } from "@utils";
import { removeTokenAndAuthenticated } from "@/utils";
import { useAuth } from "@/context";

const BASE_URL =
  import.meta.env.VITE_LOCALHOST_URL ||
  import.meta.env.VITE_PRODUCTON_SERVER_URL;

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
      const errorMessage =
        error.response?.data?.message || "please log in to get access.";
      console.warn(errorMessage);
      removeTokenAndAuthenticated();
      const { logout } = useAuth();
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
