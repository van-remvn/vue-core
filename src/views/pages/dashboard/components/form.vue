<template>
    <form @submit.prevent="hanleSubmitForm">
        <label>Email</label>

        <input class="caret-blue-500 focus:caret-indigo-500" type="text" v-model="form.email">

        <p
            v-if="v$.email.$errors.length"
            class="error d-inline-block mt-2"
        >
            {{ v$.email.$errors.length ? v$.email.$errors.at(0).$message : '' }}
        </p>


        <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" type="submit">
            {{ $t('button.save') }}
        </button>
    </form>
</template>

<script lang="ts" setup name="Form">
import { helpers } from '@vuelidate/validators'
import { email, minLength, required } from '@/plugins/Vuelidate'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
    list?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    list: () => ['vi', 'en'],
})

const emit = defineEmits<{
    (e: 'doneAction', value: boolean): void
}>()


const form = reactive({
    email: null,
})

const rules = computed(() => ({
    email: {
        required: helpers.withParams({ attribute: 'Email' }, required),
        email: helpers.withParams({ attribute: 'Email' }, email),
        minLength: helpers.withParams({ attribute: 'Email', min: 3 }, minLength(3)),
    },
}))
const v$ = useVuelidate(rules, form)

const hanleSubmitForm = () => {
    v$.value.$touch()
    const isError = v$.value.$error
    if (!isError) {
        emit('doneAction', true)
        return
    }
    emit('doneAction', false)
}
</script>

<style lang="scss" scoped></style>
