// 通过 vue-router 插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

let router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
