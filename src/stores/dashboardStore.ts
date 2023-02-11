import { defineStore } from 'pinia'

interface DashboardStoreState {
    count: number
}

interface DashboardStoreGetters {
}

interface DashboardStoreActions {
    increment(): void
}

export interface DashboardStore extends DashboardStoreActions, DashboardStoreGetters, DashboardStoreState {
}

export const useDashboardStore = defineStore('dashboard', {
    state(): DashboardStoreState {
        return {
            count: 0,
        }
    },
    getters: {},
    actions: {
        increment() {

        },
    },
})
