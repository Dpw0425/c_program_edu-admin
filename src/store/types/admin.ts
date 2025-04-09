import type { RouteRecordRaw } from "vue-router"

export interface AdminState {
  token: string | null
  user_name: string
  teacher_id: string
  permission: string[]
  status: number | null
  menuRoutes: RouteRecordRaw[]
}
