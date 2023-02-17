import type { App } from 'vue'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'
import VeeValidate from '@/plugins/VeeValidate'
import SocketIO from '@/utils/socket'
import { Middleware } from '@/helpers/Middleware'
import External from './external'
import { replaceHiddenText, toNumber, toNumberNoRound } from '@/utils/global'


export const Utils = {
    install: (app: App) => {

        /*Define global properties*/
        app.config.globalProperties.$filters = {
            toNumber,
            toNumberNoRound,
            replaceHiddenText,
        }
        app.config.globalProperties.$middleware = {
            checkPermison: Middleware.checkPermison,
            checkRole: Middleware.checkRole,
        }

        /*Installs a plugin*/
        /*app.use(VeeValidate)
        app.use(SocketIO)
        app.use(Middleware.checkAuth)*/
        app.use(Vue3ProgressPlugin)
        app.use(External)

        /*Dependency Injection*/
        app.provide('Counter', 0)

    },
}
