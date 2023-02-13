import { ApiService } from '@/services/ApiService'
import { Constant } from '@/helpers/Constant'
import type * as Auth from 'Auth'
import { FunctionHelper } from '@/helpers/Function'


export class AuthService {
    static async login(data: Auth.Login): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.post(Constant.AUTH_LOGIN, data)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }

    static async me(): Promise<ApiResponse> {
        try {
            // return await ApiService.instance().axios.get(Constant.AUTH_ME)
            const res = {
                permissions: ['USER_LIST', 'USER_DETAIL', 'USER_UPDATE', 'USER_DELETE', 'USER_CREATE'],
                roles: ['SUPER_ADMIN'],
                email: 'super_amdin@gmail.com',
                age: 30,
                created_at: '2023-01-30T07:20:39.000000Z',
                updated_at: '2023-01-30T07:20:39.000000Z',
            }
            return {
                msg: 'suucess',
                status: true,
                code: 0,
                data: [res],
            }
            /*return {
                msg: 'authorization',
                status: false,
                code: 401,
                data: [],
            }*/
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }

    static async register(data: Auth.Register): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.post(Constant.AUTH_REGISTER, data)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }

    static async conform(data: Auth.Conform): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.post(Constant.AUTH_CONFORM, data)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }
}

