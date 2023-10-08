import { ReactNode } from 'react'

import { Logo } from '../logo'

interface IItems {
  items: { icon: ReactNode; title: string; route?: string }[]
}

export const Sidebar: React.FC<IItems> = ({ items }) => {
  return (
    <aside
      id="sidebar"
      className="left-0 top-0 z-40 h-screen w-56 fixed"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 bg-secondary">
        <div className="mb-10 flex items-end rounded-lg px-3 py-2 text-white">
          <Logo />
        </div>
        <ul className="space-y-2 text-sm font-medium">
          {items.map(({ icon, title, route }) => {
            return (
              <li key={title} className="cursor-pointer">
                <a
                  href={route}
                  className="flex items-center rounded-lg px-3 py-2 text-white hover:bg-primary"
                >
                  {icon}
                  <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto flex">
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
