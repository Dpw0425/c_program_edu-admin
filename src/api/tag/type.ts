import type { ResponseData } from '../type'

// tag 列表
export interface tagItem {
  id: number
  name: string
  count: number
}
export type TagList = tagItem[]
export interface tagListResponseData extends ResponseData {
  data?: {
    tag_list: TagList
    total: number
  }
}
export interface getAllTagResponseData extends ResponseData {
  data?: {
    tag_list: TagList
  }
}

// tag 添加
export interface addTagForm {
  name: string
}
export interface addTagResponse extends ResponseData {
  data?: {}
}

// tag 修改
export interface updateTagForm {
  id: number
  name: string
}
export interface updateTagResponse extends ResponseData {
  data?: {}
}

// tag 删除
export interface deleteTagResponse extends ResponseData {
  data?: {}
}
