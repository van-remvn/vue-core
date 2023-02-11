import type { App } from 'vue'
import VeeValidate from '@/plugins/VeeValidate'
import SocketIO from '@/utils/socket'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'

import {
    replaceHiddenText,
    toNumber,
    toNumberNoRound,
} from '@/utils/global'

export const Utils = {
    install: (app: App) => {
        app.config.globalProperties.$filters = {
            toNumber,
            toNumberNoRound,
            replaceHiddenText,
        }

        // VeeValidate
        // app.use(VeeValidate)
        // app.use(SocketIO)
        app.use(Vue3ProgressPlugin)

        app.provide('Counter', 0)
    },
}
