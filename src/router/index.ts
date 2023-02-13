import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { ProgressFinisher } from '@marcoschulte/vue3-progress'
import { useProgress } from '@marcoschulte/vue3-progress'
import { forEach } from 'lodash'

import dashboardRoutes from './modules/dashboard'
import authRoutes from './modules/auth'
import errorRoutes from './modules/error'


const routes: Array<RouteRecordRaw> = [
    ...dashboardRoutes,
    ...authRoutes,
    ...errorRoutes,
]

const Router = createRouter({
    history: createWebHistory(),
    routes,
})

let progresses = [] as ProgressFinisher[]

Router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    progresses.push(useProgress().start())
})

Router.afterEach(() => {
    if (progresses && progresses.length > 1) {
        forEach(progresses, (item: ProgressFinisher) => {
            item?.finish()
        })
    } else {
        progresses.pop()?.finish()
    }
})

export default Router
