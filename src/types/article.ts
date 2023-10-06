import { Account } from './index'

export interface Article {
  id: string
  title: string
  description?: string
  body: string
  published: boolean | false
  createdAt: Date
  updatedAt: Date
  author?: Account
  authorId?: string
  imageUrl?: string
}
