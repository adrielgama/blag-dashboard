import { api } from '@/lib/httpClient'
import { IArticle } from '@/types'

type IArticles = {
  articles: IArticle[]
}

const getMyArticles = async () => {
  const { data } = await api.get<IArticles>('/articles')

  return data
}

export { getMyArticles }
