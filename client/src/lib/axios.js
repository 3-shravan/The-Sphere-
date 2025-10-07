import axios from "axios";
import { useAuth } from "@/context";
import { API_URL } from "./utils/api";
import { getToken, removeTokenAndAuthenticated } from "@/utils";
import { errorMessage } from "./utils/api-responses";

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
    const status = error?.response?.status;
    const headers = error?.response?.headers || {};
    const data = error?.response?.data;

    let message = errorMessage(error, "axios error occured ⚙");

    if (status && [401, 403].includes(status)) {
      console.warn(message, "UNAUTHORIZED");
      removeTokenAndAuthenticated();
      const { logout } = useAuth();
      logout();
      window.location.href = "/login";
      return Promise.reject(
        new Error("Unauthorized access - please log in again.")
      );
    }
    if (
      headers["content-type"]?.includes("text/html") ||
      (typeof data === "string" && data.startsWith("<!DOCTYPE html>"))
    )
      message = `Server responded with HTML (status ${status}). Likely an invalid API route or server error.`;

    if (error.request && !error.response)
      message =
        "No response from server. Please check your network connection.";

    console.error(message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
