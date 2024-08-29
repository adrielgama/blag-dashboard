import TableArticlesBase from '@/components/table-article-base'
import { IArticle } from '@/types/article'

export default function TableTopArticles({
  articles,
}: {
  articles: IArticle[] | undefined
}) {
  return (
    <TableArticlesBase
      title="Top Artigos"
      description="Os 10 artigos mais acessados"
      articles={articles}
    />
  )
}
