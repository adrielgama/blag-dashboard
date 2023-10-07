import React, { ReactNode, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/spinner'
import { useAuthContext } from '@/context/AuthContext'

interface ProtectedWrapperProps {
  children: ReactNode
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return <Spinner />
  }

  return <>{children}</>
}

export default ProtectedWrapper
