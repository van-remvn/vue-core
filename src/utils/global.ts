import { trimEnd } from 'lodash'
import numeral from 'numeral'


export const toNumber = (value: number, minimumDecimal = 0, maximumFractionDigits = 8, locale = 'en-US'): string => {
    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: minimumDecimal,
        maximumFractionDigits: maximumFractionDigits,
    })
    return formatter.format(value)
}

export const toNumberNoRound = (value: any, maximumFractionDigitsDisplay = 2): string => {
    const truncateFractionAndFormat = (value: any, maxDigits: any) => {
        let returnValue = numeral(value).format('0,0[.]' + '0'.repeat(maxDigits), Math.floor)
        // Kiểm tra có phải là số thập phân
        if (returnValue.indexOf('.') != -1) {
            // Bỏ những số 0 cuối
            returnValue = trimEnd(returnValue, '0')
        }
        // Kiểm tra nếu dấu . ở cuối sau khi bỏ số 0
        if (returnValue.substr(-1) === '.') {
            returnValue = returnValue.replace('.', '')
        }
        return returnValue
    }
    return truncateFractionAndFormat(value, maximumFractionDigitsDisplay)
}

export const replaceHiddenText = (value: string | number): string => {
    let textReplace: string
    if (!value || value.toString().length <= 3) {
        textReplace = '****'
    } else {
        let first = value.toString().slice(0, 3)
        let last = value.toString().slice(-3)
        textReplace = first + '****' + last
    }
    return textReplace
}


