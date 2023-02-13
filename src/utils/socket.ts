import type { App } from 'vue'
import { io } from 'socket.io-client'
import { AuthHelper } from '@/helpers/Auth'
import { FunctionHelper } from '@/helpers/Function'

const socketOptions = {
    host: FunctionHelper.getSocketUrl(),
}
const options: any = {
    transports: ['websocket'], /* polling */
    path: false,
    pingTimeout: 7000,
    pingInterval: 3000,
    auth: {
        token: AuthHelper.getToken().access_token,
    },
}

export default {
    install: (app: App) => {
        const socket = io(socketOptions.host, options)
        app.provide('socket', socket)
    },
}

