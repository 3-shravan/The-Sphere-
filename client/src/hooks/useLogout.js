import { useCallback } from '@lib'
import { useApi } from '@hooks'
import { removeTokenAndAuthenticated } from '@utils'

const useLogout = () => {

   const { execute, loading } = useApi('/logout', "GET", "/login")

   const logout = useCallback(async () => {
      const response = await execute();
      if (response.status === 200) removeTokenAndAuthenticated()
   })
   return { logout, loading }
}

export default useLogout
