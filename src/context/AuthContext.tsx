import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import { destroyCookie, setCookie } from 'nookies'

import { ILogin } from '@/types'
import { api } from '@/utils/httpClient'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  user: null | ILogin['user']
  isAuthenticated: boolean
  onLogin: (email: string, password: string) => Promise<void>
  onLogout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ILogin['user'] | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const isAuthenticated = Boolean(user && accessToken)

  const handleLogin = async (email: string, password: string) => {
    const response = await api.post<ILogin>('/users/login', {
      email,
      password,
    })
    console.log('API Response: ', response)

    setUser(response.data.user)
    setAccessToken(response.data.token)
    setCookie(undefined, 'accessToken', response.data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }

  const handleLogout = useCallback(() => {
    setUser(null)
    setAccessToken(null)
    destroyCookie(undefined, 'accessToken')
    localStorage.removeItem('refreshToken')
  }, [setUser])

  const refreshToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) {
      console.error('No refresh token found')
      handleLogout()
      return
    }

    try {
      const response = await api.post<ILogin>('/users/refresh-token', {
        refreshToken: storedRefreshToken,
      })
      setAccessToken(response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)
    } catch (error) {
      console.error('Token refresh error:', error)
      handleLogout()
    }
  }, [handleLogout])

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
    } else {
      delete api.defaults.headers.Authorization
    }
  }, [accessToken])

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.get('/users/verify-token', {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })

        if (response.status === 200) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuthentication()
  }, [accessToken])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      onLogin: handleLogin,
      onLogout: handleLogout,
      refreshToken,
    }),
    [user, handleLogout, refreshToken, isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
