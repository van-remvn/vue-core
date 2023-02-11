const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsImRpc3BsYXlfbmFtZSI6Ik5ndXnhu4VuIEjhu691IFBoxrDhu5tjIiwiaXNDb25mb3JtIjp0cnVlLCJyb2xlcyI6e30sImV4cGlyZXNJbiI6MTY3NjM0NTQzMywiaWF0IjoxNjc1NzQwNjMzfQ.V6sP82wwZvgvJv2zjV73w-WAClhkBNX7Q1ga2sDPUt4'

const token = {
    tokenType: 'Bearer',
    accessToken: tokenTest,
    expires_in: 3600,
    user_id: 1,
}


const MockAuthResponse = {
    requiredLogin: {
        msg: 'Vui long dang nhap',
        status: false,
        code: 400,
        data: []
    },
    success: {
        status: true,
        msg: 'success',
        code: 0,
        data: [{ token }],
    },
    info: {
        status: true,
        msg: 'success',
        code: 0,
        data: [
            {
                id: 1,
                email: 'user@demo.com',
                name: 'USER',
                token,
                roles: ['SUPER_ADMIN'],
                team_id: 1,
                branch_id: 1,
            },
        ],
    },
    fail: {
        success: false,
        msg: 'fail',
        code: 400,
        error: 'Login failed',
    },
}

export default MockAuthResponse
