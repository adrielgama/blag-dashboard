'use client'
import { ReactNode, useState } from 'react'

import { Home, Menu, LogOut, PlusCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

import Logo from './logo'
import { ButtonModeToggle } from './theme-mode-toggle'

interface NavbarProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: ReactNode
}

interface SidebarProps {
  children: ReactNode
}

const NavItem = ({ href, icon: Icon, children }: NavbarProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
        isActive
          ? 'bg-zinc-900 text-zinc-50 hover:text-zinc-200 dark:bg-zinc-600 dark:text-white'
          : ''
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  )
}

const SidebarContent = () => {
  const { data: session } = useSession()

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center px-6">
        <Link className="pt-4" href="#">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <NavItem href="/dashboard" icon={Home}>
            Início
          </NavItem>
          <NavItem href="/new-article" icon={PlusCircle}>
            Novo artigo
          </NavItem>
          <NavItem href="/articles" icon={BookOpen}>
            Meus artigos
          </NavItem>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <ButtonModeToggle variant="ghost" size="sm" className="mb-2 w-full" />
        <div className="flex items-center gap-4 border-t pt-4 dark:border-zinc-800">
          <Avatar>
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{session?.user?.name}</span>
            <button
              className="mt-1 flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
            >
              <LogOut className="h-3 w-3" /> Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ children }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-52 bg-zinc-100/40 shadow-md dark:bg-zinc-950/20 md:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed right-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-zinc-100 p-4 dark:bg-zinc-950">
        {children}
      </main>
    </div>
  )
}
