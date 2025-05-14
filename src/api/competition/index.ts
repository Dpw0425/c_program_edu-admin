import request from '@/utils/request'
import type {
  addCompetitionForm,
  addCompetitionResponseData,
  deleteCompetitionResponseData,
  updateCompetitionForm,
  updateCompetitionResponseData,
} from './type'

const COMPETITION_API = '/competition'

enum API {
  COMPETITION_LIST_URL = COMPETITION_API + '/list',
  ADD_COMPETITION_URL = COMPETITION_API + '/add',
  UPDATE_COMPETITION_URL = COMPETITION_API + '/update',
  DELETE_COMPETITION_URL = COMPETITION_API + '/delete',
}

export const reqCompetitionList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, any>(
    API.COMPETITION_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqAddCompetition = (data: addCompetitionForm) =>
  request.post<any, addCompetitionResponseData>(API.ADD_COMPETITION_URL, data)

export const reqUpdateCompetition = (data: updateCompetitionForm) =>
  request.post<any, updateCompetitionResponseData>(
    API.UPDATE_COMPETITION_URL,
    data,
  )

export const reqDeleteCompetition = (id: number) =>
  request.delete<any, deleteCompetitionResponseData>(
    API.DELETE_COMPETITION_URL + `?id=${id}`,
  )
