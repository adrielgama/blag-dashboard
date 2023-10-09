type IUser = {
  id: string
  email: string
  name: string
}

export interface ILogin {
  user: IUser
  token: string
  refreshToken: string
}
