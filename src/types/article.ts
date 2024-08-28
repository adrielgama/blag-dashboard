import { Author } from 'next/dist/lib/metadata/types/metadata-types'

interface IAuthor {
  id: string
  name: string
  email: string
}

interface IArticle {
  id: string
  title: string
  description: string
  body: string
  published: boolean
  createdAt: string
  updatedAt: string
  authorId: string
  imageUrl: string
  views: number
  author: Author
}

interface IArticlesResponse {
  articles: IArticle[]
}

interface IArticleUpdate {
  title: string
  description?: string
  body: string
  published: boolean
  imageUrl?: string
}

export type { IArticle, IArticlesResponse, IArticleUpdate, IAuthor }
