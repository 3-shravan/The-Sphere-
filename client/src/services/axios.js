import { axios } from "@lib";
import { getToken } from "@utils";

const BASE_URL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     console.log(token)
//     if (token) config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && [401, 403].includes(error.response.status)) {
//       console.warn("Unauthorized or Forbidden - possibly invalid token");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
