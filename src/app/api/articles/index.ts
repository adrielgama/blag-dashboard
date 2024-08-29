import axios from 'axios'

import { IArticle, IArticleUpdate } from '@/types/article'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const fetchArticles = async (userId: string): Promise<IArticle[]> => {
  const response = await axios.get<{ articles: IArticle[] }>(
    `${baseURL}/users/${userId}/articles`
  )
  return response.data.articles
}

export const createArticle = async (
  data: IArticleUpdate,
  accessToken: string
): Promise<IArticle> => {
  const response = await axios.post<{ article: IArticle }>(
    `${baseURL}/articles`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data.article
}

export const updateArticle = async (
  id: string,
  data: IArticleUpdate,
  accessToken: string
): Promise<IArticle> => {
  const response = await axios.patch<{ article: IArticle }>(
    `${baseURL}/articles/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data.article
}

export const deleteArticle = async (
  id: string,
  accessToken: string
): Promise<void> => {
  await axios.delete(`${baseURL}/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}
