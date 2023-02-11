declare module 'Auth' {

    interface Login {
        email: string,
        password: string,
    }

    interface Register {
        email: string,
        password: string,
    }

    interface Profile {
        email: string,
        username: string,
        phone: string,
    }

    interface Conform {
        token?: string,
        two_fa?: string,
    }
}
