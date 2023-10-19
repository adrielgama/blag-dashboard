import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'

const { VITE_API_URL } = import.meta.env

const cookies = parseCookies()
const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = cookies['blag.accessToken']
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = cookies['blag.refreshToken']

      try {
        const { data } = await api.post('/users/refresh-token', {
          refreshToken,
        })

        setCookie(null, 'blag.accessToken', data.token, { path: '/' })
        setCookie(null, 'blag.refreshToken', data.refreshToken, { path: '/' })
        api.defaults.headers.Authorization = `Bearer ${data.token}`

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Unable to refresh token', refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export { api }
