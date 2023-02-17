
export default [
    {
        path: '/profile',
        name: 'profile.index',
        component: () => import('@/views/pages/profile/index.vue'),
        meta: {
            layout: 'Default',
            auth: true
        },
    },
]
