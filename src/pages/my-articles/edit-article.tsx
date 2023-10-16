import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { EditArticleItem } from '@/components/Articles/EditArticleItem'
import { ScrollArea } from '@/components/ui/scroll-area'

export const EditArticle: React.FC = () => {
  const navigate = useNavigate()

  const handleEditNavigation = () => {
    navigate('/dashboard/articles')
  }

  return (
    <div className="rounded-md px-8 flex flex-col gap-4">
      <div
        className="cursor-pointer flex items-center gap-2 hover:underline transition-opacity w-max"
        onClick={handleEditNavigation}
      >
        <ArrowLeft size={20} />
        <p>Voltar</p>
      </div>
      <h1 className="text-2xl font-semibold text-white">
        Edite aqui sua postagem
      </h1>
      <ScrollArea>
        <EditArticleItem />
      </ScrollArea>
    </div>
  )
}
