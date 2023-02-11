import Router from '@/router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthHelper } from '@/helpers/Auth'
import { AuthService } from '@/api/Auth'


export class Middleware {

    static checkAuth() {
        Router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'auth')) {
                if (to.meta.auth) {
                    const isLoggedIn = AuthHelper.getToken()
                    if (isLoggedIn) {
                        try {
                            const response = await AuthService.me()
                            if (response && response.status) {
                                return next()
                            } else {
                                this.gotoLogin(to, next)
                            }
                        } catch (e) {
                            this.gotoLogin(to, next)
                        }
                    } else {
                        this.gotoLogin(to, next)
                    }
                } else {
                    return next()
                }
            } else {
                if (to.name?.toString() === 'auth.login') {
                    if (AuthHelper.hasToken()) {
                        this.gotoDashboard(to, next)
                    }
                    return next()
                } else {
                    return next()
                }
            }
        })
    }

    static gotoLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
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

}
