import { defineStore } from 'pinia'
import type { AdminState } from '../types/admin'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import type {
  adminInfoRsponseData,
  loginForm,
  loginResponseData,
} from '@/api/admin/type'
import { reqAdminInfo, reqLogin, reqLogout } from '@/api/admin'

let useAdminStore = defineStore('User', {
  state: (): AdminState => {
    return {
      token: GET_TOKEN(),
      user_name: '',
      teacher_id: '',
      permission: [],
      status: null,
    }
  },
  actions: {
    // 管理员登录方法
    async adminLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data?.access_token as string
        SET_TOKEN(result.data?.access_token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 管理员信息
    async adminInfo() {
      let result: adminInfoRsponseData = await reqAdminInfo()
      if (result.code == 200) {
        this.user_name = result.data?.user_name as string
        this.teacher_id = result.data?.teacher_id as string
        this.permission = result.data?.permission as string[]
        this.status = result.data?.status as number

        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },

    // 退出登录
    async logout() {
      await reqLogout()

      this.user_name = ''
      this.teacher_id = ''
      this.permission = []
      this.status = null

      REMOVE_TOKEN()
      location.reload()
      return 'ok'
    },
  },
  getters: {},
})

export default useAdminStore
