import { IAccount } from '.'

export interface RefreshToken {
  id: string
  expiresIn: number
  user: IAccount
  userId: string
}
