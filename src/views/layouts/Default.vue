<template>
    <div id="default-layout">

        <div class="min-h-full">

            <Header />

            <main id="main" :style="mainStyle">
                <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div class="px-4 py-6 sm:px-0">

                        <slot />

                    </div>
                </div>
            </main>

            <Footer />

        </div>

    </div>
</template>

<script setup lang="ts">
import Header from './partials/Header.vue'
import Footer from './partials/Footer.vue'

interface MainStyle {
    minHeight?: string
}

const mainStyle = reactive<MainStyle>({})

const calcMainHeight = () => {
    const header = document.getElementById('header')
    const footer = document.getElementById('footer')
    let mainHeight = window.innerHeight
    if (header) {
        mainHeight -= header.clientHeight
    }
    if (footer) {
        mainHeight -= footer.clientHeight
    }
    mainStyle.minHeight = mainHeight + 'px'
}

window.addEventListener('resize', () => {
    calcMainHeight()
})

onMounted(() => {
    nextTick(() => {
        calcMainHeight()
    })
})

</script>
