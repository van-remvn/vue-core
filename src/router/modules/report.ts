export default [
    {
        path: '/report',
        name: 'report.index',
        component: () => import('@/views/pages/report/index.vue'),
        meta: {
            layout: 'Default',
            auth: true,
        },
    },
]
