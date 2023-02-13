
export default [
    {
        path: '/',
        name: 'dashboard.index',
        component: () => import('@/views/pages/dashboard/index.vue'),
        meta: {
            layout: 'Default',
            auth: true
        },
    },
]
