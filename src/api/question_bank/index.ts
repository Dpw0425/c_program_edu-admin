import request from "@/utils/request";
import type { addBankForm, addBankResponseData, deleteBankResponseData, updateBankForm, updateBankResponseData } from "./type";
import type { questionListResponseData } from "../question/type";

const QUESTION_BANK_API = '/question_bank'

enum API {
    BANK_LIST_URL = QUESTION_BANK_API + '/list',
    ADD_BANK_URL = QUESTION_BANK_API + '/add',
    UPDATE_BANK_URL = QUESTION_BANK_API + '/update',
    DELETE_BANK_URL = QUESTION_BANK_API + '/delete',
    GET_QUESTION_URL = QUESTION_BANK_API + '/get_question',
    GET_BESIDE_URL = QUESTION_BANK_API + '/get_beside',
    EXCLUDE_QUESTION_URL = QUESTION_BANK_API + '/exclude_question',
}

export const reqBankList = (page: number, number: number, search: string | null) =>
    request.get<any, any>(API.BANK_LIST_URL + `?page=${page}&number=${number}&search${search}`)

export const reqAddBank = (data: addBankForm) =>
    request.post<any, addBankResponseData>(API.ADD_BANK_URL, data)

export const reqUpdateBank = (data: updateBankForm) =>
    request.post<any, updateBankResponseData>(API.UPDATE_BANK_URL, data)

export const reqDeleteBank = (id: number) =>
    request.delete<any, deleteBankResponseData>(API.DELETE_BANK_URL + `?id=${id}`)

export const reqGetQuestion = (page: number, number: number, id: number) =>
    request.get<any, questionListResponseData>(API.GET_QUESTION_URL + `?page=${page}&number=${number}&id=${id}`)

export const reqGetQuestionBesideBank = (page: number, number: number, id: number) =>
    request.get<any, questionListResponseData>(API.GET_BESIDE_URL + `?page=${page}&number=${number}&id=${id}`)

export const reqExcludeQuestion = (bank_id: number, question_id: number) =>
    request.delete<any, deleteBankResponseData>(API.EXCLUDE_QUESTION_URL + `?bank_id=${bank_id}&question_id=${question_id}`)
