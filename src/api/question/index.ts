import request from '@/utils/request'
import type {
  addQuestionForm,
  addQuestionResponse,
  addTestDataRequest,
  addTestDataResponse,
  deleteQuestionResponse,
  deleteTestDataResponse,
  getTestDataResponse,
  questionListResponseData,
  updateQuestionForm,
  updateTestDataRequest,
  updateTestDataResponse,
} from './type'

const QUESTION_API = '/question'

enum API {
  QUESTION_LIST_URL = QUESTION_API + '/list',
  ADD_QUESTION_URL = QUESTION_API + '/add',
  UPDATE_QUESTION_URL = QUESTION_API + '/update',
  DELETE_QUESTION_URL = QUESTION_API + '/delete',
  ADD_TEST_DATA_URL = QUESTION_API + '/add_test',
  UPDATE_TEST_DATA_URL = QUESTION_API + '/update_test',
  GET_TEST_DATA_URL = QUESTION_API + '/get_test',
  DELETE_TEST_DATA_URL = QUESTION_API + '/delete_test',
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
  request.delete<any, deleteQuestionResponse>(
    API.DELETE_QUESTION_URL + `?id=${id}`,
  )

export const reqAddTestData = (data: addTestDataRequest) =>
  request.post<any, addTestDataResponse>(API.ADD_TEST_DATA_URL, data)

export const reqGetTestData = (id: number) =>
  request.get<any, getTestDataResponse>(
    API.GET_TEST_DATA_URL + `?question_id=${id}`,
  )

export const reqUpdateTestData = (data: updateTestDataRequest) =>
  request.post<any, updateTestDataResponse>(API.UPDATE_TEST_DATA_URL, data)

export const reqDeleteTestData = (id: number) =>
  request.delete<any, deleteTestDataResponse>(
    API.DELETE_TEST_DATA_URL + `?id=${id}`,
  )
