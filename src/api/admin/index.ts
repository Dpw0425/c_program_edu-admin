import request from '@/utils/request'
import type { adminInfoRsponseData, loginForm, loginResponseData } from './type'

const USER_API = '/user'

enum API {
  LOGIN_URL = USER_API + '/login',
  ADMININFO_URL = USER_API + '/info',
  LOGOUT_URL = USER_API + '/logout',
}

export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqAdminInfo = () =>
  request.get<any, adminInfoRsponseData>(API.ADMININFO_URL)

export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL)
