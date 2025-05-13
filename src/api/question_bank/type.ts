import type { NormalData, ResponseData } from "../type"

// 题库列表
export interface bankItem {
    id: number
    name: string
    content: string
    open_grade: string[] | null
    participants: number
    completed: number
    count: number
}
export type BankList = bankItem[]
export interface bankListResponseData extends ResponseData {
    data?: {
        bank_list: BankList
        total: number
    }
}

// 创建题库
export interface addBankForm {
    name: string
    content: string
    open_grade: string[] | null
    questions: number[] | null
}
export interface addBankResponseData extends ResponseData {
    data?: NormalData
}

// 更新题库
export interface updateBankForm {
    id: number
    name: string
    content: string
    open_grade: string[] | null
    question_id: number[] | null
}
export interface updateBankResponseData extends ResponseData {
    data?: NormalData
}

// 删除题库
export interface deleteBankResponseData extends ResponseData {
    data?: NormalData
}
