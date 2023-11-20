import { IArticle } from '@/types'

import ArticleItem from './ArticleItem'
import { ScrollArea } from '../ui/scroll-area'

interface ListArticlesProps {
  articles?: IArticle[] | undefined
  title?: string
  fromDraft?: boolean | false
}

export const ListArticles: React.FC<ListArticlesProps> = ({
  articles = [],
  title = 'Todos os seus artigos',
  fromDraft,
}) => {
  return (
    <div className="rounded-md py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white mb-4">{title}</h1>
      <ScrollArea>
        {articles?.length === 0 && (
          <div className="text-center">
            {fromDraft
              ? 'Nenhum artigo em rascunho'
              : 'Você ainda não possui artigos publicados'}
          </div>
        )}
        {articles?.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            fromDraft={fromDraft}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
