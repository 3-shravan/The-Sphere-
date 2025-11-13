import axios from "axios"
// import { useAuth } from "@/context"
import { getToken, removeTokenAndAuthenticated } from "@/utils"
import { API_URL } from "./utils/api"
import { errorMessage } from "./utils/api-responses"

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers.authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const headers = error?.response?.headers || {}
    const data = error?.response?.data
    // const { logout } = useAuth()

    let message = errorMessage(error, "axios error occured ⚙")

    if (status && [401, 403].includes(status)) {
      console.warn(message, "UNAUTHORIZED")
      removeTokenAndAuthenticated()
      // logout()
      if (logoutFn) logoutFn()
      window.location.href = "/login"
      return Promise.reject(new Error("Unauthorized access - please log in again."))
    }
    if (
      headers["content-type"]?.includes("text/html") ||
      (typeof data === "string" && data.startsWith("<!DOCTYPE html>"))
    )
      message = `Server responded with HTML (status ${status}). Likely an invalid API route or server error.`

    if (error.request && !error.response)
      message = "No response from server. Please check your network connection."

    console.error(message)
    return Promise.reject(new Error(message))
  },
)



// Allow setting a custom logout handler
let logoutFn = null

export const setLogoutHandler = (fn) => {
  logoutFn = fn
}


export default axiosInstance
