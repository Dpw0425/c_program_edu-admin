import type { ResponseData } from '../type'

interface userItem {
  user_id: number
  user_name: string
  student_id?: string
  grade: number
  status: number
}

export type UserList = userItem[]

export interface userListResponseData extends ResponseData {
  data?: {
    user_list: UserList
    total: number
  }
}

interface adminItem {
  id: number
  user_name: string
  teacher_id: string
  permission: string
  status: number
}

export type AdminList = adminItem[]

export interface adminListResponseData extends ResponseData {
  data?: {
    admin_list: AdminList
    total: number
  }
}
