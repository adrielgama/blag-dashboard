import axios from 'axios'

import { IArticle } from '@/types/article'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const fetchArticles = async (userId: string): Promise<IArticle[]> => {
  const response = await axios.get<{ articles: IArticle[] }>(
    `${baseURL}/users/${userId}/articles`
  )
  return response.data.articles
}
