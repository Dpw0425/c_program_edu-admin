import request from "@/utils/request"
import type { loginForm, loginResponseData } from "./type"

const USER_API = '/user'

enum API {
    LOGIN_URL = USER_API + '/login',
}

export const reqLogin = (data: loginForm) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)