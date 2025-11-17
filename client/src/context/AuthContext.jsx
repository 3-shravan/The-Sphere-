import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useChatStore } from "@/features/chat/store/chatStore"
import { useApi, useSocket } from "@/hooks"
import { setLogoutHandler } from "@/lib/axios"
import { showErrorToast, showSuccessToast } from "@/lib/utils/api-responses"
import { getIsAuthenticated, getToken, removeTokenAndAuthenticated } from "@/utils"

export const AuthContext = createContext()

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    isAuthenticated: getIsAuthenticated() ?? false,
    token: getToken() || null,
    profile: null,
  }))

  const userId = auth?.profile?._id
  const { onlineUsers } = useSocket(userId)
  console.log(onlineUsers)
  const { setOnlineUsers } = useChatStore()
  useEffect(() => {
    setOnlineUsers(onlineUsers)
  }, [onlineUsers, setOnlineUsers])
  

  const { request, loading } = useApi()

  const resetAuth = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      token: null,
      profile: null,
    })
    removeTokenAndAuthenticated()
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!getToken()) return resetAuth()
      try {
        const res = await request({ endpoint: "auth/profile" })
        setAuth({
          isAuthenticated: true,
          token: getToken(),
          profile: res?.data?.user,
        })
      } catch (error) {
        showErrorToast(error, "Failed to fetch user profile")
        resetAuth()
      }
    }
    fetchUserProfile()
  }, [request, resetAuth])

  const logout = useCallback(async () => {
    try {
      const response = await request({ endpoint: "auth/logout" })
      resetAuth()
      showSuccessToast(response, "Logged out 😢")
    } catch (error) {
      showErrorToast(error, "Logout failed")
    }
  }, [request, resetAuth])

  useEffect(() => {
    setLogoutHandler(logout)
  }, [logout])

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
