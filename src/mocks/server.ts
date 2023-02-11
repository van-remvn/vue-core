import querystring from 'querystring'
import { Response, Server } from 'miragejs'
import { FunctionHelper } from '@/helpers/Function'
import MockAuthResponse from '@/mocks/data/auth'


export function makeServer({ environment = 'development' } = {}) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsImRpc3BsYXlfbmFtZSI6Ik5ndXnhu4VuIEjhu691IFBoxrDhu5tjIiwiaXNDb25mb3JtIjp0cnVlLCJyb2xlcyI6e30sImV4cGlyZXNJbiI6MTY3NjM0NTQzMywiaWF0IjoxNjc1NzQwNjMzfQ.V6sP82wwZvgvJv2zjV73w-WAClhkBNX7Q1ga2sDPUt4'

    const checkTokenUser = (request: any) => {
        if (!request.requestHeaders.Authorization) return false
        return request.requestHeaders.Authorization === 'Bearer ' + token
    }


    return new Server({
        environment,

        routes() {
            this.get(FunctionHelper.getBaseUrl('/api/auth/me'), (schema, request) => {
                if (!checkTokenUser(request)) {
                    return new Response(200, {}, MockAuthResponse.requiredLogin)
                }
                return new Response(200, {}, MockAuthResponse.info)
            })

            this.post(FunctionHelper.getBaseUrl('/api/auth/login'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)

                if (attrs.email !== 'test@demo.com' || attrs.password !== '123456') {
                    return new Response(200, {}, MockAuthResponse.fail)
                }

                return new Response(200, {}, MockAuthResponse.success)
            })
        },
    })
}
