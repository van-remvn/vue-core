import { FunctionHelper } from '@/helpers/Function'
import { ApiService } from '@/services/ApiService'
import { Constant } from '@/helpers/Constant'
import type * as User from 'User'

export class UserService {

    static async list(data?: User.Pagination | any): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.get(Constant.USER_LIST, data)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }

    static async detail(id: string): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.get(Constant.USER_DETAIL + '/' + id)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }

    static async delete(id: string): Promise<ApiResponse> {
        try {
            const res = await ApiService.instance().axios.delete(Constant.USER_DELETE + '/' + id)
            return res.data
        } catch (e) {
            return FunctionHelper.responseCacheApi()
        }
    }
}
