export {}
declare global {
    interface ApiResponse {
        status?: boolean,
        msg?: string,
        code: string | number,
        data: any
    }

    interface Token {
        access_token: string;
        token_type: string;
        expires_in: number;
        user_id: number;
    }
}
