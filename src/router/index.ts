import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { ProgressFinisher } from '@marcoschulte/vue3-progress'
import { useProgress } from '@marcoschulte/vue3-progress'
import { forEach } from 'lodash'
import dashboardRoutes from './modules/dashboard'
import authRoutes from './modules/auth'
import errorRoutes from './modules/error'
import profileRoutes from './modules/profile'
import reportRoutes from './modules/report'


const routes: Array<RouteRecordRaw> = [
    ...authRoutes,
    ...dashboardRoutes,
    ...profileRoutes,
    ...reportRoutes,
    ...errorRoutes,
]

const Router = createRouter({
    history: createWebHistory(),
    routes,
})


let progresses = [] as ProgressFinisher[]
Router.beforeEach(async () => {
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
