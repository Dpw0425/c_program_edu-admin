import request from '@/utils/request'
import type {
  addTagForm,
  addTagResponse,
  deleteTagResponse,
  getAllTagResponseData,
  tagListResponseData,
  updateTagForm,
  updateTagResponse,
} from './type'

const TAG_API = '/tag'

enum API {
  LIST_URL = TAG_API + '/list',
  ADD_URL = TAG_API + '/add',
  UPDATE_URL = TAG_API + '/update',
  DELETE_URL = TAG_API + '/delete',
  GET_ALL_URL = TAG_API + '/get_all',
}

export const reqTagList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, tagListResponseData>(
    API.LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqAddTag = (data: addTagForm) =>
  request.post<any, addTagResponse>(API.ADD_URL, data)

export const reqUpdateTag = (data: updateTagForm) =>
  request.post<any, updateTagResponse>(API.UPDATE_URL, data)

export const reqDeleteTag = (id: number) =>
  request.delete<any, deleteTagResponse>(API.DELETE_URL + `?id=${id}`)

export const reqGetAllTag = () =>
  request.get<any, getAllTagResponseData>(API.GET_ALL_URL)
