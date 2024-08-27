'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Spinner from '@/components/spinner'

export default function HomePage() {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') return router.push('/dashboard')
  if (status === 'unauthenticated') return router.push('/auth/login')

  return <Spinner />
}
