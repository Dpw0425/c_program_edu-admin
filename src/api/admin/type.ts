import type { ResponseData } from '../type'

export interface loginForm {
  user_name: string
  password: string
}

interface tokenData {
  type: string
  access_token: string
  expires_in: string
}
export interface loginResponseData extends ResponseData {
  data?: tokenData
}
