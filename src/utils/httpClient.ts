// utils/httpClient.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.adrielgama.dev',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      try {
        const { data } = await api.post('/users/refresh-token', {
          refreshToken,
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        api.defaults.headers.Authorization = `Bearer ${data.token}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Unable to refresh token', refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export { api }
