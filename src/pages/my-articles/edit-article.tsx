import { EditArticleItem } from '@/components/Articles/EditArticleItem'
import { ScrollArea } from '@/components/ui/scroll-area'
// import { useArticleContext } from '@/context/ArticleContext'

export const EditArticle: React.FC = () => {
  // const { articles } = useArticleContext()
  return (
    <div className="rounded-md p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Edite aqui sua postagem
      </h1>
      <ScrollArea>
        <EditArticleItem />
      </ScrollArea>
    </div>
  )
}
