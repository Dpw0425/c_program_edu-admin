import request from '@/utils/request'
import type { addAdminForm, addAdminResponseData, deleteAdminResponse, updateAdminForm, updateAdminReponse, userListResponseData } from './type'

const AUTH_API = '/auth'

enum API {
  USER_LIST_URL = AUTH_API + '/user_list',
  ADMIN_LIST_URL = AUTH_API + '/admin_list',
  ADD_ADMIN_URL = AUTH_API + '/add_admin',
  UPDATE_ADMIN_URL = AUTH_API + '/update_admin',
  DELETE_ADMIN_URL = AUTH_API + '/delete_admin',
}

export const reqUserList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, userListResponseData>(
    API.USER_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqAdminList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, any>(
    API.ADMIN_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqAddAdmin = (data: addAdminForm) =>
  request.post<any, addAdminResponseData>(API.ADD_ADMIN_URL, data)

export const reqUpdateAdmin = (data: updateAdminForm) =>
  request.post<any, updateAdminReponse>(API.UPDATE_ADMIN_URL, data)

export const reqDeleteAdmin = (id: number) =>
  request.delete<any, deleteAdminResponse>(API.DELETE_ADMIN_URL + `?id=${id}`)
