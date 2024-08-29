import TableArticlesBase from '@/components/table-article-base'
import { IArticle } from '@/types/article'

export default function TableArticles({
  articles,
}: {
  articles: IArticle[] | undefined
}) {
  return (
    <TableArticlesBase
      title="Meus Artigos"
      description="Aqui você pode ver todos os seus artigos criados"
      showAuthor
      articles={articles}
    />
  )
}
