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
            return await ApiService.instance().axios.get(Constant.AUTH_ME)
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

