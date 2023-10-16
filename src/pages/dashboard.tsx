import { Route, Routes } from 'react-router-dom'

import { Sidebar } from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Home } from './home'
import {
  CreateArticle,
  DraftArticles,
  EditArticle,
  MyArticles,
} from './my-articles'
import { Profile } from './profile'

export const Dashboard: React.FC = () => {
  return (
    <>
      <Sidebar />
      <ScrollArea className="ml-56 py-8 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<CreateArticle />} />
          <Route path="/articles" element={<MyArticles />} />
          <Route path="/drafts" element={<DraftArticles />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ScrollArea>
    </>
  )
}
