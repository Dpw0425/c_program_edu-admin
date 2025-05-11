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

// 查看测试数据
export interface testDataItem {
  question_id: number
  id: number
  input: string
  output: string
}
export type testDataList = testDataItem[]
export interface getTestDataResponse extends ResponseData {
  data?: {
    test_data_list: testDataList
  }
}

// 新增测试数据
export interface addTestDataRequest {
  question_id: number
  input: string
  output: string
}
export interface addTestDataResponse extends ResponseData {
  data?: NormalData
}

// 修改测试数据
export interface updateTestDataRequest {
  question_id: number
  id: number
  input: string
  output: string
}
export interface updateTestDataResponse extends ResponseData {
  data?: NormalData
}

// 删除测试数据
export interface deleteTestDataResponse extends ResponseData {
  data?: NormalData
}
