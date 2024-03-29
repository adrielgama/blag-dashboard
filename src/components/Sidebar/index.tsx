import {
  BadgePlus,
  BookOpenCheck,
  Home,
  LogOut,
  PenSquare,
  User2,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'

import { Logo } from '../logo'
import { Button } from '../ui/button'

export const Sidebar = () => {
  const { onLogout } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarItems = [
    { icon: <Home />, title: 'Home', route: '/dashboard' },
    {
      icon: <BadgePlus />,
      title: 'Nova Postagem',
      route: '/dashboard/new-post',
    },
    {
      icon: <BookOpenCheck />,
      title: 'Meus artigos',
      route: '/dashboard/articles',
    },
    { icon: <PenSquare />, title: 'Rascunhos', route: '/dashboard/drafts' },
    { icon: <User2 />, title: 'Perfil', route: '/dashboard/profile' },
  ]

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <aside
      id="sidebar"
      className="left-0 top-0 z-40 h-screen w-56 fixed"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 bg-blue-400">
        <div className="mb-10 flex items-end rounded-lg px-3 py-2 text-white">
          <Logo />
        </div>
        <ul className="space-y-2 text-sm font-medium">
          {sidebarItems.map(({ icon, title, route }) => {
            let isActive = location.pathname === route

            if (
              title === 'Meus artigos' &&
              location.pathname.startsWith('/dashboard/edit')
            ) {
              isActive = true
            }

            return (
              <li key={title} className="cursor-pointer">
                <Link
                  to={route}
                  className={`
                    flex items-center rounded-lg px-3 py-2 text-white 
                    ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}
                  `}
                >
                  {icon}
                  <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto flex flex-col gap-4">
          <Button variant="outline" onClick={handleLogout}>
            Sair
            <LogOut className="ml-4" size={16} />
          </Button>
          <div className="flex w-full justify-center">
            <a
              className="text-sm font-medium text-text hover:text-white/50"
              href="http://adrielgama.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              adrielgama.dev
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
