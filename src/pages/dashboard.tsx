import { Sidebar } from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Home } from './home'

export const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <ScrollArea className="ml-56 py-8 min-h-screen">
        <Home />
      </ScrollArea>
    </>
  )
}
