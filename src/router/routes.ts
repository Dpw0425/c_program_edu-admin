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
        },
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
        },
      },
    ],
  },
  {
    // 题目管理
    path: '/question',
    component: () => import('@/layout/index.vue'),
    name: 'Question',
    meta: {
      title: '题目管理',
      hidden: false,
      icon: 'Notebook',
    },
    children: [
      {
        // 题目列表
        path: '/question/list',
        component: () => import('@/views/question/list/index.vue'),
        name: 'QuestionBankList',
        meta: {
          title: '题目列表',
          hidden: false,
          icon: 'Document',
        },
      },
      {
        // 分类管理
        path: '/question/tag',
        component: () => import('@/views/question/tag/index.vue'),
        name: 'Tag',
        meta: {
          title: '分类管理',
          hidden: false,
          icon: 'Paperclip',
        },
      },
    ],
  },
  {
    // 题库管理
    path: '/question_bank',
    component: () => import('@/layout/index.vue'),
    name: 'QuestionBank',
    meta: {
      title: '题库管理',
      hidden: false,
      icon: 'Briefcase',
    },
    children: [
      {
        // 题库列表
        path: '/quetsion_bank/list',
        component: () => import('@/views/question_bank/list/index.vue'),
        name: 'QustionBankList',
        meta: {
          title: '题库列表',
          hidden: false,
          icon: 'List',
        },
      },
    ],
  },
  {
    // 比赛管理
    path: '/competition',
    component: () => import('@/layout/index.vue'),
    name: 'Competition',
    meta: {
      title: '比赛管理',
      hidden: false,
      icon: 'Trophy',
    },
    children: [
      // 比赛列表
      {
        path: '/competition/list',
        component: () => import('@/views/competition/list/index.vue'),
        name: 'CompetitionList',
        meta: {
          title: '比赛列表',
          hidden: false,
          icon: 'Files',
        },
      },
    ],
  },
]
