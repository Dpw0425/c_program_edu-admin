import { defineStore } from "pinia";

// layout 组件配置仓库
let useLayoutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            refresh: false,
        }
    },
})

export default useLayoutSettingStore
