import { IAccount } from './index'

export interface IArticle {
  id: string
  title: string
  description?: string
  body: string
  published: boolean | false
  createdAt: Date
  updatedAt: Date
  author?: IAccount
  authorId?: string
  imageUrl?: string
}
