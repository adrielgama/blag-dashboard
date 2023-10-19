import { IArticle } from '@/types'
import { api } from '@/utils/httpClient'

type IArticles = {
  articles: IArticle[]
}

const getMyArticles = async () => {
  const { data } = await api.get<IArticles>('/articles')

  return data
}

export { getMyArticles }
