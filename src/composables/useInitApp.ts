import { LanguageHelper } from '@/helpers/Language'
import type { AppStore } from '@/stores/appStore'
import { useAppStore } from '@/stores/appStore'

export default function useInitApp() {

    const appStore: AppStore = useAppStore()


    // Load toàn bộ ngôn ngữ và set ngôn ngữ cho i18n
    const initLanguageForApp = async (): Promise<void> => {
        const locale = LanguageHelper.getLocale()
        LanguageHelper.setLocale(locale)
        appStore.setLocale(locale)
        await LanguageHelper.loadLanguage()
        appStore.initApp()
    }


    // Thay đổi ngôn ngữ và set ngôn ngữ cho i18n
    const changeLanguage = (lang: string) => {
        LanguageHelper.setLocale(lang)
        appStore.setLocale(lang)
    }


    return {
        initLanguageForApp,
        changeLanguage,
    }
}
