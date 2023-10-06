import { User, Article, RefreshToken } from './index'

export interface Account {
  id: string
  name: string
  email: string
  password: string
  typeUser: User
  createdAt: string
  Article: Article[]
  RefreshToken?: RefreshToken
}
