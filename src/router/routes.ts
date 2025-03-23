export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: 'layout',
    },
    redirect: '/home',
    children: [
      {
        // 首页
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'home',
        },
      },
    ],
  },
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', // 命名路由
    meta: {
      title: '登录',
    },
  },
]
