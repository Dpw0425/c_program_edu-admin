import request from '@/utils/request'
import type { addQuestionForm, addQuestionResponse, deleteQuestionResponse, questionListResponseData, updateQuestionForm } from './type'

const QUESTION_API = '/question'

enum API {
  QUESTION_LIST_URL = QUESTION_API + '/list',
  ADD_QUESTION_URL = QUESTION_API + '/add',
  UPDATE_QUESTION_URL = QUESTION_API + '/update',
  DELETE_QUESTION_URL = QUESTION_API + '/delete',
}

export const reqQuestionList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, questionListResponseData>(
    API.QUESTION_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqAddQuestion = (data: addQuestionForm) =>
  request.post<any, addQuestionResponse>(API.ADD_QUESTION_URL, data)

export const reqUpdateQuestion = (data: updateQuestionForm) =>
  request.post<any, addQuestionResponse>(API.UPDATE_QUESTION_URL, data)

export const reqDeleteQuestion = (id: number) =>
  request.delete<any, deleteQuestionResponse>(API.DELETE_QUESTION_URL + `?id=${id}`)
