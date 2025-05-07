import request from "@/utils/request";
import type { userListResponseData } from "./type";

const AUTH_API = '/auth'

enum API {
    USER_LIST_URL = AUTH_API + '/user_list',
    ADMIN_LIST_URL = AUTH_API + '/admin_list',
}

export const reqUserList = (page: number, number: number, search: string | null) =>
    request.get<any, userListResponseData>(API.USER_LIST_URL + `?page=${page}&number=${number}&search${search}`)

export const reqAdminList = (page: number, number: number, search: string | null) =>
    request.get<any, any>(API.ADMIN_LIST_URL + `?page=${page}&number=${number}&search${search}`)
