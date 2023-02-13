import { defineStore } from 'pinia'
import { AuthService } from '@/api/Auth'
import type * as Auth from 'Auth'


interface AuthStoreState {
    isAuth: boolean
    profile: Auth.Profile | null
    permissions: string[]
    roles: string[]
}

interface AuthStoreGetters {
}

interface AuthStoreActions {
    login(data: Auth.Login): Promise<any>

    me(): Promise<any>

    register(data: Auth.Register): Promise<any>
}

export interface AuthStore extends AuthStoreActions, AuthStoreGetters, AuthStoreState {
}

export const useAuthStore = defineStore('auth', {
    state(): AuthStoreState {
        return {
            isAuth: false,
            profile: null,
            permissions: [],
            roles: [],
        }
    },
    getters: {},
    actions: {
        async login(data: Auth.Login): Promise<any> {
            const response = await AuthService.login(data)
            if (response && response.code === 0) {
                this.isAuth = true
                /*
                * TODO
                * */
            }
            return response
        },

        async me(): Promise<any> {
            const response = await AuthService.me()
            if (response && response.code === 0) {
                /*
                * TODO
                * */
                this.profile = response.data[0]
                return response
            }
            return response
        },

        async register(data: Auth.Register): Promise<any> {
            const response = await AuthService.register(data)
            if (response && response.code === 0) {
                /*
                * TODO
                * */
            }
            return response
        },
    },
})
