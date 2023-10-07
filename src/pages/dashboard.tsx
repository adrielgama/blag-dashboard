import { useEffect } from 'react'

import { useAuthContext } from '@/context/AuthContext'

export const Dashboard = () => {
  const { isAuthenticated } = useAuthContext()
  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard</h1>
      <h1>{isAuthenticated === true ? 'YES' : 'NO'}</h1>
    </div>
  )
}
