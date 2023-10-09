import { Route, Routes } from 'react-router-dom'

import { Sidebar } from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Home } from './home'
import { MyArticles } from './my-articles'

export const Dashboard: React.FC = () => {
  return (
    <>
      <Sidebar />
      <ScrollArea className="ml-56 py-8 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<MyArticles />} />
        </Routes>
      </ScrollArea>
    </>
  )
}
