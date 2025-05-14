import type { NormalData, ResponseData } from "../type"

// 比赛列表
export interface competitionItem {
    id: number
    name: string
    contestant: string[]
    owner_id: number
    start_time: string
    deadline: string
    status: number
    category: number
    permission: number
}
export type CompetitionList = competitionItem[]
export interface competitionListResponseData extends ResponseData {
    data?: {
        competition_list: CompetitionList
        total: number
    }
}

// 创建比赛
export interface addCompetitionForm {
    name: string
    start_time: string
    deadline: string
    category: number
    permission: number
}
export interface addCompetitionResponseData extends ResponseData {
    data?: NormalData
}

// 修改比赛信息
export interface updateCompetitionForm {
    id: number
    name: string
    start_time: string
    deadline: string
    category: number
    permission: number
}
export interface updateCompetitionResponseData extends ResponseData {
    data?: NormalData
}

// 删除比赛
export interface deleteCompetitionResponseData extends ResponseData {
    data?: NormalData
}
