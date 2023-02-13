import Router from '@/router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthHelper } from '@/helpers/Auth'
import { AuthService } from '@/api/Auth'
import type { AuthStore } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'
import { includes, some } from 'lodash'


export class Middleware {

    static gotoLogin(to: any, next: NavigationGuardNext): void {
        return next({
            name: 'auth.login',
            query: {
                redirect: to ? encodeURIComponent(to.fullPath) || encodeURIComponent(to.path) : null,
            },
        })
    }

    static gotoDashboard(to: any, next: NavigationGuardNext) {
        return next({
            name: 'dashboard.index',
        })
    }

    static gotoDenied(to: any, next: NavigationGuardNext) {
        return next({
            name: '404',
        })
    }

    static checkAuth() {
        Router.beforeEach(async (to: RouteLocationNormalized | any, from: RouteLocationNormalized | any, next: NavigationGuardNext | any) => {
            if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'auth')) {
                if (to.meta.auth) {
                    const isLoggedIn = AuthHelper.getToken()
                    if (isLoggedIn) {
                        try {
                            const response = await AuthService.me()
                            if (response && response.status) {
                                return next()
                            }
                            return Middleware.gotoLogin(to, next)
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
                if (to.name?.toString() === 'auth.login') {
                    if (AuthHelper.hasToken()) {
                        return Middleware.gotoDashboard(to, next)
                    }
                    return next()
                } else {
                    return next()
                }
            }
        })
    }

    static checkPermison(requiredPermissions: string[], myPermissions: string[]): boolean {

        const authStore: AuthStore = useAuthStore()

        if (!authStore.permissions) return false

        if (authStore.profile?.email?.toString() === 'super_admin@gmail.com') return true

        if (!myPermissions) myPermissions = authStore.permissions

        if (myPermissions && !Array.isArray(myPermissions)) myPermissions = [myPermissions]

        if (requiredPermissions && !Array.isArray(requiredPermissions)) requiredPermissions = [requiredPermissions]

        if (requiredPermissions && requiredPermissions.length > 0) {
            return some(myPermissions, permission => includes(requiredPermissions, permission))
        }

        return true
    }

    static checkRole(requiredRoles?: string[], myRoles?: string[]): boolean {

        const authStore: AuthStore = useAuthStore()

        if (!authStore.roles) return false

        if (authStore.profile?.email?.toString() === 'super_admin@gmail.com') return true

        if (!myRoles) myRoles = authStore.roles

        const superAdminRole = ['SUPER_ADMIN'] as any
        if (myRoles.indexOf(superAdminRole) == -1) return true

        if (myRoles && !Array.isArray(myRoles)) myRoles = [myRoles]

        if (requiredRoles && !Array.isArray(requiredRoles)) requiredRoles = [requiredRoles]

        if (requiredRoles && requiredRoles.length > 0) {
            return some(myRoles, role => includes(requiredRoles, role))
        }

        return true
    }

}
