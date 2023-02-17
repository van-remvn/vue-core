import { createApp } from 'vue'

import App from './App.vue'
import Router from './router'

import './assets/style'
import { Pinia } from '@/plugins/Pinia'
import { I18n } from '@/plugins/I18n'
import { Utils } from '@/utils'

import { makeServer } from '@/mocks/server'

if (import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === true) {
    makeServer()
}

const boostrap = async () => {
    const app = createApp(App)

    try {
        app.use(I18n)
        app.use(Router)
        app.use(Pinia)
        app.use(Utils)

        await Router.isReady()

        app.mount('#app')
    } catch (e) {

    }
}

boostrap()
    .then()
    .catch()
