import { StorageService } from '@/services/StorageService'


export class AuthHelper {

    static hasToken(): boolean {
        return !!StorageService.get('token')
    }

    static getToken(): Token {
        return StorageService.get('token', {} as any)
    }

    static setToken(token: Token): void {
        StorageService.set('token', token, 60 * 60 * 24 * 7)
    }

    static clearToken(): void {
        StorageService.remove('token')
    }

}
