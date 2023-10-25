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

import { api } from '@/lib/httpClient'
import { ILogin, IUser, IUserUpdate } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  user: null | ILogin['user'] | IUser | IUserUpdate
  isAuthenticated: boolean
  onLogin: (email: string, password: string) => Promise<void>
  onLogout: () => void
  updateUser: (id: string, userData: IUserUpdate) => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const cookies = parseCookies()
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
    } = cookies
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

  const updateUser = async (id: string, userData: IUserUpdate) => {
    try {
      const response = await api.patch(`/users/${id}`, userData)

      const { user: userComing } = response?.data || {}

      if (userComing && userComing.password) {
        delete userComing.password
      }

      setCookie(undefined, 'blag.user', JSON.stringify(userComing), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })

      setUser(userComing)
    } catch (error) {
      console.error(`Failed to update user with id ${id}`, error)
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      onLogin: handleLogin,
      onLogout: handleLogout,
      updateUser,
    }),
    [user, isAuthenticated, handleLogin, handleLogout, updateUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
