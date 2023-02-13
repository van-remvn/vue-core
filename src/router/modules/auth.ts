
export default [
    {
        path: '/auth/login',
        name: 'auth.login',
        component: () => import('@/views/pages/auth/login/index.vue'),
        meta: {
            layout: 'Auth'
        },
    },
]
