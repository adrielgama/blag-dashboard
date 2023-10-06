import { Account } from './index'

export interface RefreshToken {
  id: string
  expiresIn: number
  user: Account
  userId: string
}
