import type { App } from 'vue'
import { io } from 'socket.io-client'
import { AuthHelper } from '@/helpers/Auth'
import { FunctionHelper } from '@/helpers/Function'


export default {
    install: (app: App) => {
        // const token = AuthHelper.getToken()?.access_token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaHZpY2FAeWFob28uY29tIiwiaWQiOjIsInVzZXJuYW1lIjoiQW5oIFZpIEPDoSIsImlhdCI6MTY3NjM0MTkwNiwiZXhwIjoxNjc2OTQ2NzA2fQ.2laa77fe1MC62bDVO4MvWtqnxug0-3XREQprPGQeXb0'

        const socketOptions = {
            host: FunctionHelper.getSocketUrl(),
        }

        const options: any = {
            transports: ['websocket'],
            path: false,
            pingTimeout: 7000,
            pingInterval: 3000,
            auth: { token },
        }

        const socket = io(socketOptions.host, options)

        socket.emit('login', { token })

        app.provide('socket', socket)
    },
}

