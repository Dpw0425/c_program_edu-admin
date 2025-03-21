import { defineStore } from "pinia";
import type { AdminState } from "../types/admin";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
import type { loginForm, loginResponseData } from "@/api/admin/type";
import { reqLogin } from "@/api/admin";

let useAdminStore = defineStore('User', {
    state: (): AdminState => {
        return {
            token: GET_TOKEN()
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
        }
    }
})

export default useAdminStore