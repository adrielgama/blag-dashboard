/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { redirect } from 'react-router-dom'

type JwtPayload = {
  exp: number
  sub: string
}

const { VITE_API_URL } = import.meta.env

const ACCESS_TOKEN_KEY = '@seller/order.access_token'
const REFRESH_TOKEN_KEY = '@seller/order.refresh_token'

let isRefreshing = false
let failedRequestsQueue: any[] = []

const onForceLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)

  redirect('/')
}

const httpClient = () => {
  const query = new URLSearchParams(window.location.search)

  const accessToken =
    localStorage.getItem(ACCESS_TOKEN_KEY) || query.get('accessToken')
  const refreshToken =
    localStorage.getItem(REFRESH_TOKEN_KEY) || query.get('refreshToken')

  const api = axios.create({
    baseURL: `${VITE_API_URL}`,
  })

  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const { sub } = jwtDecode<JwtPayload>(accessToken)
    api.defaults.headers.common.admin_id = sub
  }

  api.defaults.headers.common.pharmacy_id = query.get('pharmacyId')

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response?.status)) {
        let isExpired = true

        if (accessToken) {
          const { exp } = jwtDecode<JwtPayload>(accessToken)
          isExpired = dayjs.unix(exp as number).diff(dayjs()) < 1
        }

        if (isExpired) {
          const originalRequest = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/users/refresh-token', {
                refreshToken,
              })
              .then((response) => {
                const { token: newAccessToken, refreshToken: newRefreshToken } =
                  response.data

                localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken)
                localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)

                api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(newAccessToken)
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                onForceLogout()
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`

                resolve(api(originalRequest))
              },
              onFailure: (err: Error) => {
                reject(err)
              },
            })
          })
        }

        onForceLogout()
      }

      return Promise.reject(error)
    }
  )

  return api
}

export { httpClient }
