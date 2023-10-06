type IUser = {
  id: string
  email: string
}

export interface ILogin {
  user: IUser
  token: string
  refreshToken: string
}
