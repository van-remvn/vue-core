import { I18n } from '@/plugins/I18n'
import { filter } from 'lodash'
import moment from 'moment'


export class FunctionHelper {

    private static VITE_BASE_URL = import.meta.env.VITE_BASE_URL

    static responseCacheApi(): ApiResponse {
        return {
            msg: 'error',
            status: false,
            code: 1000,
            data: [],
        }
    }

    static getMessageErrorCode(code: string | number = 0): string {
        return I18n.global.t(`alert.${code.toString()}`)
    }

    static filteredOptions(options: any = [], keyword?: string | null): any[] {
        if (keyword && keyword.length > 0) {
            return filter(options, item => {
                if (typeof item === 'object') {
                    return (item.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
                } else {
                    return (item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
                }
            })
        }
        return options
    }

    static dateFormat(value: string | number): string {
        return moment(value).format('YYYY-MM-DD')
    }

    static dateTimeFormat(value: string | number): string {
        return moment(value).format('YYYY-MM-DD HH:mm')
    }

    static dateTimeSecondFormat(value: string | number): string {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }

    static fromNow(value: string | number): string {
        return moment(value).fromNow()
    }

    static toNow(value: string | number): string {
        return moment(value).toNow()
    }

    static getBaseUrl(url?: string): string {
        let basePath = this.VITE_BASE_URL
        if (url) basePath += url
        return basePath.toString()
    }

    static getSocketUrl(): string {
        return import.meta.env.VITE_SOCKET_URL.toString()
    }
}
