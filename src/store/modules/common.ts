import { defineStore } from 'pinia'
import type { commonState } from '../types/common'
import { getLunarDate, getMonthType } from '@/utils/time'
import { monthNames, weekdays } from '../constants/date'

let useCommonStore = defineStore('CommonStore', {
  state: (): commonState => {
    return {
      month: '',
      date: '',
      weekday: '',
      monthType: '',
      lunarDate: '',
    }
  },
  actions: {
    // 获取日历
    GetCalendar() {
      const today = new Date()
      const monthType = getMonthType(today)

      this.month = monthNames[today.getMonth()]
      this.monthType = monthType
      if (today.getDate() < 10) {
        this.date = '0' + today.getDate().toString()
      } else {
        this.date = today.getDate().toString()
      }
      this.weekday = weekdays[today.getDay()]
      this.lunarDate = getLunarDate(today)
    },
  },
  getters: {},
})

export default useCommonStore
