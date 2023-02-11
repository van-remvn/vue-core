import moment from 'moment'

class Storage {
    private readonly _isSupport: boolean

    constructor() {
        this._isSupport = true
    }

    static get timestamp() {
        return moment.now() / 1000
    }

    static __isExpired(entity: any) {
        if (!entity) return true
        return Storage.timestamp - (entity.timestamp + entity.expired_second) >= 0
    }

    set(key: string, value: any, expired_second = 60 * 60 * 24 * 30) {
        if (!this._isSupport) {
            return this
        }
        if (expired_second < 1 || isNaN(expired_second)) expired_second = 60 * 60 * 24 * 30 // default is 30 days

        if (!key && !value) {
            console.error('Missing Parameter')
            return this
        }
        const entity = {
            timestamp: Storage.timestamp,
            expired_second,
            key,
            value,
        }
        localStorage.setItem(key, JSON.stringify(entity))
        return this
    }

    get(key: string, defaultValue = null) {
        if (!this._isSupport) {
            return defaultValue
        }

        let entity

        entity = localStorage.getItem(key)
        if (entity) {
            try {
                entity = JSON.parse(entity)
            } catch (e) {
                return defaultValue
            }
        } else {
            return defaultValue
        }

        if (!entity.expired_second) return entity.value

        if (Storage.__isExpired(entity)) {
            this.remove(key)
            return defaultValue
        } else {
            return entity.value
        }
    }

    remove(key: string) {
        if (!this._isSupport) {
            return this
        }
        if (!key) {
            return this
        }
        localStorage.removeItem(key)
        return this
    }

    clear() {
        if (!this._isSupport) {
            return null
        }
        localStorage.clear()
        return this
    }

}

export const StorageService = new Storage()

