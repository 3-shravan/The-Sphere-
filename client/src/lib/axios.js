import axios from "axios";
import { useAuth } from "@/context";
import { API_URL } from "./utils/api";
import { getToken, removeTokenAndAuthenticated } from "@/utils";

const axiosInstance = axios.create({
  baseURL: API_URL,
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
