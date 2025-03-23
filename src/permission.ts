import router from "@/router"
// @ts-ignore
// 路由切换进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

import pinia from "./store"
import useAdminStore from "./store/modules/admin"
let adminStore = useAdminStore(pinia)

const publicPaths = [
    '/login',
    '/404',
    '/:pathMatch(.*)*',
]

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    nprogress.start()
    document.title = to.meta.title + ' - C程序设计训练平台后台管理系统'

    let token = adminStore.token
    let teacher_id = adminStore.teacher_id
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (teacher_id) {
                next()
            } else {
                try {
                    await adminStore.adminInfo()
                    next()
                } catch(error) {
                    await adminStore.logout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (publicPaths.includes(to.path)) {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done()
})