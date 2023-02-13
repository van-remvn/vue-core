export default [
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/pages/error/404.vue'),
        meta: {
            layout: 'Error',
        },
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/pages/error/403.vue'),
        meta: {
            layout: 'Error',
        },
    },
    {
        path: '/*',
        name: 'catchAll',
        component: () => import('@/views/pages/error/404.vue'),
        meta: {
            layout: 'Error',
        },
    },
]
