import request from '@/utils/request'
import type {
  addCompetitionForm,
  addCompetitionResponseData,
  addQuestionToCptForm,
  addQuestionToCptResponseData,
  deleteCompetitionResponseData,
  updateCompetitionForm,
  updateCompetitionResponseData,
} from './type'
import type { questionListResponseData } from '../question/type'

const COMPETITION_API = '/competition'

enum API {
  COMPETITION_LIST_URL = COMPETITION_API + '/list',
  ADD_COMPETITION_URL = COMPETITION_API + '/add',
  UPDATE_COMPETITION_URL = COMPETITION_API + '/update',
  DELETE_COMPETITION_URL = COMPETITION_API + '/delete',
  GET_QUESTION_URL = COMPETITION_API + '/get_question',
  GET_BESIDE_URL = COMPETITION_API + '/get_beside',
  ADD_QUESTION_URL = COMPETITION_API + '/add_question',
  EXCLUDE_QUESTION_URL = COMPETITION_API + '/exclude_question',
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

export const reqGetQuestionInCpt = (page: number, number: number, id: number) =>
  request.get<any, questionListResponseData>(
    API.GET_QUESTION_URL + `?page=${page}&number=${number}&id=${id}`,
  )

export const reqGetQuestionBesideCpt = (
  page: number,
  number: number,
  id: number,
  search: string | null,
) =>
  request.get<any, questionListResponseData>(
    API.GET_BESIDE_URL +
      `?page=${page}&number=${number}&id=${id}&search${search}`,
  )

export const reqAddQuestionToCpt = (data: addQuestionToCptForm) =>
  request.post<any, addQuestionToCptResponseData>(API.ADD_QUESTION_URL, data)

export const reqExcludeQuestionFromCpt = (
  competition_id: number,
  question_id: number,
) =>
  request.delete<any, deleteCompetitionResponseData>(
    API.EXCLUDE_QUESTION_URL +
      `?competition_id=${competition_id}&question_id=${question_id}`,
  )
