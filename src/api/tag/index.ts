import request from "@/utils/request"
import type { tagListResponseData } from "./type"

const TAG_API = '/tag'

enum API {
    LIST_URL = TAG_API + '/list',
}

export const reqTagList = (page: number, number: number, search: string | null) =>
    request.get<any, tagListResponseData>(API.LIST_URL+`?page=${page}&number=${number}&search${search}`)