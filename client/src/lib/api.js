const isLocalhost = window.location.hostname === "localhost";
export const MODE = isLocalhost ? "development" : "production";

export const BASE_API_URL = isLocalhost
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000";

export const API_URL = isLocalhost
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : "http://localhost:8000/api/v1";

export const CLIENT_URL = isLocalhost
  ? import.meta.env.VITE_CLIENT_URL
  : "http://localhost:5173";

// export const BASE_API_URL = "http://localhost:8000";
// export const API_URL = "http://localhost:8000/api/v1";
// export const CLIENT_URL = "http://localhost:5173";
