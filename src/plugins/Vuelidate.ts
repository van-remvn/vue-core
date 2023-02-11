// @ts-ignore
import * as validators from '@vuelidate/validators'
import { I18n } from '@/plugins/I18n'

const { createI18nMessage } = validators

const withI18nMessage = createI18nMessage({
    t: I18n.global.t.bind(I18n),
    messagePath({ $validator }: any) {
        return `validation.${$validator}`
    },
})

export const email = withI18nMessage(validators.email)
export const required = withI18nMessage(validators.required)
export const requiredIf = withI18nMessage(validators.requiredIf, { withArguments: true })
export const minLength = withI18nMessage(validators.minLength, { withArguments: true })
export const maxLength = withI18nMessage(validators.maxLength, { withArguments: true })
export const minValue = withI18nMessage(validators.minValue, { withArguments: true })
export const maxValue = withI18nMessage(validators.maxValue, { withArguments: true })
export const alpha = withI18nMessage(validators.alpha)
export const alphaNum = withI18nMessage(validators.alphaNum)
export const numeric = withI18nMessage(validators.numeric)
export const integer = withI18nMessage(validators.integer)
export const decimal = withI18nMessage(validators.decimal)
export const ipAddress = withI18nMessage(validators.ipAddress)
export const macAddress = withI18nMessage(validators.macAddress, { withArguments: true })
export const sameAs = withI18nMessage(validators.sameAs, { withArguments: true })
export const url = withI18nMessage(validators.url)
export const not = withI18nMessage(validators.not, { withArguments: true })
export const and = withI18nMessage(validators.and, { withArguments: true })
export const or = withI18nMessage(validators.or, { withArguments: true })
export const requiredUnless = withI18nMessage(validators.requiredUnless, { withArguments: true })
export const between = withI18nMessage(validators.between, { withArguments: true })

/*
* In msg lỗi:  {{ v$.price.$errors.length ? v$.price.$errors.at(0).$message : '' }}
*
* Rules :
* const rules = computed(() => ({
*     price: {
*        minLength: helpers.withParams({ attribute: t('trading.amount'), min: 3 }, minLength(3)),
*    },
* }))
*
* */
