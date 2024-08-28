import { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const baseURL = process.env.NEXT_PUBLIC_API_URL

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
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000
      }

      if (
        typeof token.accessTokenExpires === 'number' &&
        Date.now() < token.accessTokenExpires
      ) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        id: token.sub,
      }
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    },
  },
  cookies: {
    sessionToken: {
      name: `blag.next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `blag.next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${baseURL}/users/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    })

    const refreshedTokens = await res.json()

    if (!res.ok) {
      throw new Error('Failed to refresh access token')
    }

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    }
  } catch (error) {
    console.error('RefreshAccessTokenError', error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
    error?: string
  }

  interface User {
    id: string
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    error?: string
  }
}
