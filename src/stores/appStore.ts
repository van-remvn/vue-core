import { defineStore } from 'pinia'

interface AppStoreState {
    isCompleteApp: boolean
    locale: string
}

interface AppStoreGetters {
}

interface AppStoreActions {
    initApp(): void

    setLocale(locale: string): void
}

export interface AppStore extends AppStoreState, AppStoreActions, AppStoreGetters {
}

export const useAppStore = defineStore('app', {
    state(): AppStoreState {
        return {
            isCompleteApp: false,
            locale: '',
        }
    },
    getters: {},
    actions: {
        initApp(): void {
            try {
                this.isCompleteApp = true
            } catch (e) {
            }
        },

        setLocale(locale: string): void {
            this.locale = locale.toString()
        },
    },
})
