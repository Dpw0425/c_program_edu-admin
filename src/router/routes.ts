export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: 'layout',
      hidden: false,
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
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '其它路由',
      hidden: true,
    },
  },
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', // 命名路由
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    // 权限管理
    path: '/authorization',
    component: () => import('@/layout/index.vue'),
    name: 'Authorization',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        // 用户管理
        path: '/authorization/user',
        component: () => import('@/views/authorization/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        }
      },
      {
        // 管理员管理
        path: '/authorization/admin',
        component: () => import('@/views/authorization/admin/index.vue'),
        name: 'Admin',
        meta: {
          title: '管理员管理',
          hidden: false,
          icon: 'Avatar',
        }
      },
    ]
  },
]
