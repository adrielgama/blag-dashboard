/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'

import { ILogin, IUser } from '@/types'
import { api } from '@/utils/httpClient'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  user: null | ILogin['user'] | IUser
  isAuthenticated: boolean
  onLogin: (email: string, password: string) => Promise<void>
  onLogout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<ILogin['user'] | IUser | null>(null)
  const isAuthenticated = !!user

  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json)
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    const {
      'blag.user': userComingFromCookie,
      'blag.refreshToken': refreshToken = null,
    } = parseCookies()
    const parsedUser = parseJSON(userComingFromCookie)
    if (parsedUser && refreshToken) {
      setUser(parsedUser)
    } else {
      handleLogout()
    }
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post<ILogin>('/users/login', {
        email,
        password,
      })
      console.log('API Response: ', response)
      const { token, refreshToken, user: userComing } = response?.data || {}

      setCookie(undefined, 'blag.accessToken', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })
      setCookie(undefined, 'blag.refreshToken', refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })
      setCookie(undefined, 'blag.user', JSON.stringify(userComing), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })

      setUser(userComing)
      api.defaults.timeout = 5000
      api.defaults.headers.Authorization = `Bearer ${token}`
    } catch (error) {
      console.error('Ops, deu ruim: ', error)
    }
  }

  const handleLogout = useCallback(() => {
    setUser(null)
    destroyCookie(undefined, 'blag.accessToken')
    destroyCookie(undefined, 'blag.refreshToken')
    destroyCookie(undefined, 'blag.user')
    navigate('/')
  }, [setUser])

  const refreshToken = useCallback(async () => {
    const storedRefreshToken = parseCookies(undefined, 'blag.refreshToken')
    if (!storedRefreshToken) {
      console.error('No refresh token found')
      handleLogout()
      return
    }

    try {
      const response = await api.post<ILogin>('/users/refresh-token', {
        refreshToken: storedRefreshToken,
      })
      setCookie(undefined, 'blag.refreshToken', response.data.refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })
    } catch (error) {
      alert('Token refresh error!')
      console.error('Token refresh error:', error)
      handleLogout()
    }
  }, [handleLogout])

  // useEffect(() => {
  //   if (!accessToken) return

  //   const checkAuthentication = async () => {
  //     try {
  //       const response = await api.get('/users/verify-token', {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //         withCredentials: true,
  //       })

  //       if (response.status === 200 && !isAuthenticated) {
  //         setIsAuthenticated(true)
  //       }
  //     } catch (error) {
  //       console.error('Erro ao verificar autenticação:', error)
  //       setIsAuthenticated(false)
  //     }
  //   }

  //   checkAuthentication()
  // }, [accessToken, isAuthenticated])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      onLogin: handleLogin,
      onLogout: handleLogout,
      refreshToken,
    }),
    [user, isAuthenticated, handleLogin, handleLogout, refreshToken]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
