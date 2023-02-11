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


            
        </div>
    </div>
</template>

<script lang="ts" setup name="TheDashboard">
import type { AppStore } from '@/stores/appStore'
import { useAppStore } from '@/stores/appStore'
import { LanguageHelper } from '@/helpers/Language'

const { locale, t } = useI18n()
const appStore: AppStore = useAppStore()

// const form = reactive({
//     email: '',
//     password: ''
// })
// const email = ref('')
// const password = ref('')

// import { Field, Form, ErrorMessage } from 'vee-validate';
// import * as yup from 'yup';
// const emailRules = yup.string().required().email().min(8).label(t('auth.email'));

const changeLanguage = (locale: string) => {
    LanguageHelper.setLocale(locale)
    appStore.setLocale(locale)
}

const submit = () => {
    console.log('submit')
}

onMounted(() => {

})

</script>

<style scoped lang="scss">

</style>
