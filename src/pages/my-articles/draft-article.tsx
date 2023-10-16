import { ListArticles } from '@/components/Articles/ListArticles'
import { useArticleContext } from '@/context/ArticleContext'

export const DraftArticles: React.FC = () => {
  const { articles } = useArticleContext()
  const draftArticles = articles.filter(({ published }) => published === false)

  return (
    <div className="flex flex-col gap-4 container">
      <ListArticles
        articles={draftArticles || []}
        title="Seus artigos não publicados"
        fromDraft
      />
    </div>
  )
}
