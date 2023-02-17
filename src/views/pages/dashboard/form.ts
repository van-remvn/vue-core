import { defineComponent } from 'vue'
import { toNumber } from '@/utils/global'

export default defineComponent({
    name: 'Count',
    template:
        `
            <li>Rendering using JSX {{ toNumber(count) }} {{ msg }}</li>
            <button type="submit" @click="increment">Increment</button>
            <button style="margin: 0 8px" type="submit" @click="decrement">Decrement</button>
            <button type="submit" @click="reset">Reset</button>
        `
    ,
    props: {
        msg: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            buttonText: 'Click me!',
            count: 100000,
        }
    },
    methods: {
        toNumber,
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
        reset() {
            this.count = 100000
        },
    },
    watch: {
        msg: {
            immediate: true,
            deep: true,
            handler(value) {
            },
        },
    },
})

