import { User, IArticle } from '.'

export interface IUser {
  id: string
  name: string
  email: string
  typeUser: User
  createdAt: string
  Article: IArticle[]
}
