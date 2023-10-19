/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useCallback,
  Dispatch,
  FC,
  SetStateAction,
} from 'react'

import { parseCookies } from 'nookies'

import { IArticle, IArticleUpdate } from '@/types'
import { api } from '@/utils/httpClient'

import { useAuthContext } from './AuthContext'

interface ArticleProviderProps {
  children: ReactNode
}

interface IArticleContextData {
  articles: IArticle[]
  setArticles: Dispatch<SetStateAction<IArticle[]>>
  getArticles: () => Promise<void>
  getArticleByUserID: () => Promise<void>
  updateArticle: (id: string, articleData: IArticleUpdate) => Promise<void>
  selectedArticle: IArticle | null
  setSelectedArticle: Dispatch<SetStateAction<IArticle | null>>
  createArticle: (articleData: IArticleUpdate) => Promise<void>
  deleteArticle: (id: string) => Promise<void>
}

const ArticleContext = createContext({} as IArticleContextData)

export const useArticleContext = () => useContext(ArticleContext)

export const ArticleProvider: FC<ArticleProviderProps> = ({ children }) => {
  const { onLogout } = useAuthContext()
  const [articles, setArticles] = useState<IArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null)

  const getArticles = useCallback(async () => {
    try {
      const response = await api.get('/articles')
      setArticles(response.data.articles)
    } catch (error) {
      console.error('Error fetching articles', error)
    }
  }, [])

  const getArticleById = async (id: string) => {
    try {
      const response = await api.get(`/articles/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch article with id ${id}`, error)
    }
  }

  const getArticleByUserID = useCallback(async () => {
    try {
      const { 'blag.user': userCookie } = parseCookies()
      const { id: userId } = JSON.parse(userCookie || '{}')

      if (!userId) {
        onLogout()
      }

      const response = await api.get(`/users/${userId}/articles`)
      setArticles(response.data.articles)
    } catch (error) {
      console.error('Error fetching articles by user ID:', error)
    }
  }, [])

  const createArticle = async (articleData: IArticleUpdate) => {
    try {
      const response = await api.post('/articles', articleData)
      setArticles((prev) => [...prev, response.data.articles])
    } catch (error) {
      console.error('Ops, deu ruim: ', error)
    }
  }

  const updateArticle = async (id: string, articleData: IArticleUpdate) => {
    try {
      const response = await api.patch(`/articles/${id}`, articleData)
      setArticles((prev) =>
        prev.map((article) =>
          article.id === id ? response.data.articles : article
        )
      )
    } catch (error) {
      console.error(`Failed to update article with id ${id}`, error)
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      await api.delete(`/articles/${id}`)
      setArticles((prev) => prev.filter((article) => article.id !== id))
    } catch (error) {
      console.error(`Failed to delete article with id ${id}`, error)
    }
  }

  const value = useMemo(
    () => ({
      articles,
      setArticles,
      getArticles,
      getArticleById,
      createArticle,
      updateArticle,
      deleteArticle,
      getArticleByUserID,
      selectedArticle,
      setSelectedArticle,
    }),
    [
      articles,
      setArticles,
      getArticles,
      getArticleByUserID,
      selectedArticle,
      setSelectedArticle,
      updateArticle,
      deleteArticle,
    ]
  )

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  )
}
