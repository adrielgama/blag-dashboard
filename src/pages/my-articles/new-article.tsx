import { CreateArticle as CreateArticleItem } from '@/components/Articles/CreateArticle'
import { ScrollArea } from '@/components/ui/scroll-area'

export const CreateArticle: React.FC = () => {
  return (
    <div className="rounded-md px-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        Criar uma nova postagem
      </h1>
      <ScrollArea>
        <CreateArticleItem />
      </ScrollArea>
    </div>
  )
}
