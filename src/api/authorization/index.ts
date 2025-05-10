import request from '@/utils/request'
import type {
  addAdminForm,
  addAdminResponseData,
  deleteAdminResponse,
  deleteUserResponseData,
  updateAdminForm,
  updateAdminReponse,
  updateUserForm,
  updateUserResponseData,
  userListResponseData,
} from './type'

const AUTH_API = '/auth'

enum API {
  USER_LIST_URL = AUTH_API + '/user_list',
  ADMIN_LIST_URL = AUTH_API + '/admin_list',
  ADD_ADMIN_URL = AUTH_API + '/add_admin',
  UPDATE_ADMIN_URL = AUTH_API + '/update_admin',
  DELETE_ADMIN_URL = AUTH_API + '/delete_admin',
  UPDATE_USER_URL = AUTH_API + '/update_user',
  DELETE_USER_URL = AUTH_API + '/delete_user',
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

export const reqUpdateUser = (data: updateUserForm) =>
  request.post<any, updateUserResponseData>(API.UPDATE_USER_URL, data)

export const reqDeleteUser = (user_id: string) =>
  request.delete<any, deleteUserResponseData>(
    API.DELETE_USER_URL + `?id=${user_id}`,
  )
