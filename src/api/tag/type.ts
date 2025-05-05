import type { ResponseData } from '../type'

interface tagItem {
  id: number
  name: string
  count: number
}
export type TagList = tagItem[]

export interface tagListResponseData extends ResponseData {
  data: {
    tag_list: TagList
    total: number
  }
}
