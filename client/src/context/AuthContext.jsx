import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi, useSocket } from "@/hooks"
import { showErrorToast, showSuccessToast } from "@/lib/utils/api-responses"
import { getIsAuthenticated, getToken, removeTokenAndAuthenticated } from "@/utils"

const AuthContext = createContext()

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated() ?? false,
    token: getToken() || null,
    profile: null,
  }))

  useSocket(auth?.profile?._id)

  const { request, loading } = useApi()
  const resetAuth = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      profile: null,
    })
    removeTokenAndAuthenticated()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!getToken()) return resetAuth()
      try {
        const { data } = await request({ endpoint: "auth/profile" })
        setAuth({
          isAuthenticated: true,
          token: getToken(),
          profile: data?.user,
        })
      } catch (error) {
        showErrorToast(error, "Failed to fetch user profile")
        resetAuth()
      }
    }
    fetchUserProfile()
  }, [request, navigate])

  const logout = async () => {
    try {
      const response = await request({ endpoint: "auth/logout" })
      resetAuth()
      showSuccessToast(response, "Logged out 😢")
    } catch (error) {
      showErrorToast(error, "Logout failed")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user: auth?.profile,
        currentUserId: auth?.profile?._id,
        logout,
        globalLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within a ContextProvider")
  return context
}
