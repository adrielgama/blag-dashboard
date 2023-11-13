import axios from 'axios'
import { parseCookies } from 'nookies'

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
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
