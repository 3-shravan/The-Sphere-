const isLocalhost = window.location.hostname === "localhost";
export const MODE = isLocalhost ? "development" : "production";

export const BASE_API_URL = import.meta.env.VITE_API_URL;
export const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
