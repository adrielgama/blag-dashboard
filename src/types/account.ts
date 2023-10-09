import { User, IArticle, RefreshToken } from './index'

export interface IAccount {
  id: string
  name: string
  email: string
  password: string
  typeUser: User
  createdAt: string
  Article: IArticle[]
  RefreshToken?: RefreshToken
}
