import Router from '@/router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthHelper } from '@/helpers/Auth'
import { AuthService } from '@/api/Auth'
import type { AuthStore } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'
import { forEach, includes, some } from 'lodash'

export class Middleware {

    static gotoLogin(to: RouteLocationNormalized, next: NavigationGuardNext): void {
        return next({
            name: 'auth.login',
            query: {
                redirect: to ? encodeURIComponent(to.fullPath) || encodeURIComponent(to.path) : null,
            },
        })
    }

    static gotoDashboard(to: RouteLocationNormalized, next: NavigationGuardNext) {
        return next({
            name: 'dashboard.index',
        })
    }

    static gotoDenied(to: RouteLocationNormalized, next: NavigationGuardNext) {
        return next({
            name: '404',
        })
    }

    static checkAuth() {
        Router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

            if (to.name?.toString() === 'auth.login') {
                if (AuthHelper.hasToken()) {
                    return Middleware.gotoDashboard(to, next)
                }
                return next()

            } else if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'auth')) {
                if (to.meta.auth) {
                    const isLoggedIn = AuthHelper.hasToken()
                    if (isLoggedIn) {
                        try {
                            const response = await AuthService.me()
                            if (response && response.status && response.code === 0) {
                                return next()
                            } else {
                                AuthHelper.clearToken()
                                return Middleware.gotoLogin(to, next)
                            }
                        } catch (e) {
                            return Middleware.gotoLogin(to, next)
                        }
                    } else {
                        return Middleware.gotoLogin(to, next)
                    }
                } else {
                    return next()
                }
            } else {
                return next()
            }
        })
    }

    static checkPermison(requiredPermissions: string[]): boolean {

        const authStore: AuthStore = useAuthStore()

        /* List pms of me */
        let myPermissions: string[] = authStore.permissions || []

        if (myPermissions && !Array.isArray(myPermissions))
            myPermissions = [myPermissions]

        if (!authStore.permissions)
            return false

        if (authStore.profile?.email?.toString() === 'super_admin@gmail.com')
            return true

        if (requiredPermissions && !Array.isArray(requiredPermissions))
            requiredPermissions = [requiredPermissions]

        if (requiredPermissions && requiredPermissions.length > 0) {
            return some(myPermissions, permission => includes(requiredPermissions, permission))
        }

        return true
    }

    static checkRole(requiredRoles?: string[]): boolean {

        const authStore: AuthStore = useAuthStore()

        if (!authStore.roles)
            return false

        if (authStore.profile?.email?.toString() === 'super_admin@gmail.com')
            return true

        /* List role of me */
        let myRoles: string[] = authStore.roles || []

        const superAdminRole = ['SUPER_ADMIN'] as any
        if (myRoles.indexOf(superAdminRole) == -1)
            return true

        if (myRoles && !Array.isArray(myRoles))
            myRoles = [myRoles]

        if (requiredRoles && !Array.isArray(requiredRoles))
            requiredRoles = [requiredRoles]

        if (requiredRoles && requiredRoles.length > 0) {
            return some(myRoles, role => includes(requiredRoles, role))
        }

        return true
    }

}
