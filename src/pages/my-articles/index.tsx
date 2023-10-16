import { ListArticles } from '@/components/Articles/ListArticles'
import { useArticleContext } from '@/context/ArticleContext'

export const MyArticles: React.FC = () => {
  const { articles } = useArticleContext()

  return (
    <div className="flex flex-col gap-4 container">
      <ListArticles articles={articles || []} />
    </div>
  )
}
