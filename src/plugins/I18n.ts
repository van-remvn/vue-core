import { createI18n } from 'vue-i18n'

const messages = {
}

export const I18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    legacy: false,
    missingWarn: true,
})

