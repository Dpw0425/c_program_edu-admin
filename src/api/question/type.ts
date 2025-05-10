import type { NormalData, ResponseData } from '../type'

// 题目列表
export interface questionItem {
  id: number
  title: string
  content: string
  answer: string
  tag: string[]
  degree: number
  owner_id: number
  passing_rate: number
  status: number
}
export type QuestionList = questionItem[]
export interface questionListResponseData extends ResponseData {
  data?: {
    question_list: QuestionList
    total: number
  }
}

// 发布题目
export interface addQuestionForm {
  title: string
  content: string
  answer: string
  tag: string[]
  degree: number
  status: number
}
export interface addQuestionResponse extends ResponseData {
  data?: NormalData
}

// 修改题目
export interface updateQuestionForm {
  id: number
  title: string
  content: string
  answer: string
  tag: string[]
  degree: number
  status: number
}
export interface updateQuestionResponse extends ResponseData {
  data?: NormalData
}

// 删除题目
export interface deleteQuestionResponse extends ResponseData {
  data?: NormalData
}
