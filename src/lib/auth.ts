import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const baseURL = process.env.API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials:', credentials)

        try {
          const res = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          const contentType = res.headers.get('content-type')

          if (!contentType || !contentType.includes('application/json')) {
            console.error('Received non-JSON response:', await res.text())
            return null
          }

          const data = await res.json()
          console.log('API Response:', data)

          if (!res.ok) {
            console.error('Failed to authenticate', data)
            return null
          }

          if (data.token) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.token,
              refreshToken: data.refreshToken,
            }
          } else {
            return null
          }
        } catch (error) {
          console.error('Error during authentication', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
}
