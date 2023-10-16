import { IArticle } from '@/types'

import ArticleItem from './ArticleItem'
import { ScrollArea } from '../ui/scroll-area'

interface ListArticlesProps {
  articles?: IArticle[]
}

export const ListArticles: React.FC<ListArticlesProps> = ({
  articles = [],
}) => {
  return (
    <div className="rounded-md py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Todos os seus artigos listados abaixo
      </h1>
      <ScrollArea>
        {articles?.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </ScrollArea>
    </div>
  )
}
