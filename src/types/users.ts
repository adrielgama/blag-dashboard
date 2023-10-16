import { User, IArticle } from '.'

export interface IUser {
  id: string
  name: string
  email: string
  typeUser?: User
  createdAt?: string
  Article?: IArticle[]
}

export interface IUserUpdate {
  id?: string
  name?: string
  email?: string
  password?: string
  typeUser?: User
}
