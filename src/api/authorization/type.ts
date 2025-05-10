import type { NormalData, ResponseData } from '../type'

// 用户列表
export interface userItem {
  user_id: string
  user_name: string
  student_id: string
  grade: number
  status: number
  email: string
  avatar: string
}
export type UserList = userItem[]
export interface userListResponseData extends ResponseData {
  data?: {
    user_list: UserList
    total: number
  }
}

// 修改用户信息
export interface updateUserForm {
  user_id: string
  student_id: string
  email: string
  avatar: string
  user_name: string
  grade: number
  status: number
}
export interface updateUserResponseData extends ResponseData {
  data?: {
    user_list: UserList
  }
}

// 删除用户
export interface deleteUserResponseData extends ResponseData {
  data?: NormalData
}

// 管理员列表
export interface adminItem {
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

// 添加管理员
export interface addAdminForm {
  user_name: string
  teacher_id: string
  password: string
  permission: string
}
export interface addAdminResponseData extends ResponseData {
  data?: NormalData
}

// 修改管理员信息
export interface updateAdminForm {
  id: number
  user_name: string
  teacher_id: string
  permission: string
}
export interface updateAdminReponse extends ResponseData {
  data?: NormalData
}

// 删除管理员
export interface deleteAdminResponse extends ResponseData {
  data?: NormalData
}
