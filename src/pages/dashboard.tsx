import { useEffect } from 'react'

import { BadgePlus, Home as HomeIcon, PenSquare, User2 } from 'lucide-react'

import { Sidebar } from '@/components/Sidebar'
import { useAuthContext } from '@/context/AuthContext'

import { Home } from './home'

export const sidebarItems = [
  { icon: <HomeIcon />, title: 'Home' },
  { icon: <BadgePlus />, title: 'Nova Postagem' },
  { icon: <PenSquare />, title: 'Rascunhos' },
  { icon: <User2 />, title: 'Perfil' },
]

export const Dashboard = () => {
  const { isAuthenticated } = useAuthContext()
  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  return (
    <div className="flex">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 p-10 container min-h-screen">
        <Home />
      </div>
    </div>
  )
}
