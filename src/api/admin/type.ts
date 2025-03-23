import type { NormalData, ResponseData } from '../type'

// login
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

// info
interface adminInfo {
  user_name: string
  teacher_id: string
  permission: string[]
  status: number
}
export interface adminInfoRsponseData extends ResponseData {
  data?: adminInfo
}

// logout
export interface logoutResponseData extends ResponseData {
  data?: NormalData
}
