import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from './modules/dashboard'
import type { ProgressFinisher } from '@marcoschulte/vue3-progress'
import { useProgress } from '@marcoschulte/vue3-progress'
import { forEach } from 'lodash'

const routes: Array<RouteRecordRaw> = [
    ...dashboardRoutes,
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
