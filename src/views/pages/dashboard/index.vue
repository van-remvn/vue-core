<template>
    <div id="dashboard-page">
        <div class="text-center">
            <div>
                <p class=" text-blue-600">{{ $t('dashboard.the_page') }}</p>
                <p>
                    <button
                        class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                        @click="changeLanguage('vi')"
                    >
                        VietNam
                    </button>
                    <template v-if="appStore?.locale === 'vi'"> OK</template>
                </p>
                <p>
                    <button
                        class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                        @click="changeLanguage('en')"
                    >
                        English
                    </button>
                    <template v-if="appStore?.locale === 'en'"> OK</template>
                </p>
            </div>

            <div>
                <Form
                    :list="['vi', 'en']"
                    @doneAction="handleDoneAction"
                />


                <p v-if="$middleware.checkPermison('USER_LIST')"> checkPermisonOK</p>
                <p v-if="$middleware.checkRole('ADMIN')"> checkRoleOK</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="TheDashboard">
import Form from './components/form.vue'

import { LanguageHelper } from '@/helpers/Language'
import type { AppStore } from '@/stores/appStore'
import { useAppStore } from '@/stores/appStore'
import type { AuthStore } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'

const { locale, t } = useI18n()
const appStore: AppStore = useAppStore()
const authStore: AuthStore = useAuthStore()


const changeLanguage = (locale: string) => {
    LanguageHelper.setLocale(locale)
    appStore.setLocale(locale)
}

const handleDoneAction = (value: boolean) => {
}


onMounted(() => {
    authStore.me()
})

</script>

<style scoped lang="scss">

</style>
