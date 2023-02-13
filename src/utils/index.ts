import type { App } from 'vue'
import VeeValidate from '@/plugins/VeeValidate'
import SocketIO from '@/utils/socket'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'

import {
    replaceHiddenText,
    toNumber,
    toNumberNoRound,
} from '@/utils/global'

import { Middleware } from '@/helpers/Middleware'

export const Utils = {
    install: (app: App) => {
        app.config.globalProperties.$filters = {
            toNumber,
            toNumberNoRound,
            replaceHiddenText,
        }


        app.config.globalProperties.$middleware = {
            checkPermison: Middleware.checkPermison,
            checkRole: Middleware.checkRole,
        }

        // app.use(VeeValidate) // VeeValidate
        // app.use(SocketIO) // SocketIO
        app.use(Vue3ProgressPlugin)
        app.use(Middleware.checkAuth)

        app.provide('Counter', 0)
    },
}
