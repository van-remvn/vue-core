<template>

    <main v-if="appStore.isCompleteApp">

        <vue3-progress-bar />

        <AppLayout />

    </main>

</template>

<script setup lang="ts">
import AppLayout from '@/views/layouts/AppLayout.vue'
import { LanguageHelper } from '@/helpers/Language'
import useInitFlowbite from '@/composables/useInitFlowbite'
import type { AuthStore } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'
import type { AppStore } from '@/stores/appStore'
import { useAppStore } from '@/stores/appStore'

const authStore: AuthStore = useAuthStore()
const appStore: AppStore = useAppStore()

// Load toàn bộ ngôn ngữ và set ngôn ngữ cho i18n
const initLanguageForApp = async (): Promise<void> => {
    const locale = LanguageHelper.getLocale()
    LanguageHelper.setLocale(locale)
    appStore.setLocale(locale)
    await LanguageHelper.loadLanguage().then(() =>
        appStore.initApp()
    )
}
// Thay đổi ngôn ngữ và set ngôn ngữ cho i18n
const changeLanguage = (locale: string) => {
    LanguageHelper.setLocale(locale)
    appStore.setLocale(locale)
}


onBeforeMount(async () => {
    await initLanguageForApp()
    useInitFlowbite()
})

onMounted(() => {
})

</script>

<style scoped>
</style>
