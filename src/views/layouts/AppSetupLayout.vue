<template>
    <component :is="layout">
        <RouterView />
    </component>
</template>

<script setup lang="ts" name="Layout">
import Default from './Default.vue'

const layout = ref()
const route = useRoute()

watch(
    () => route.meta?.layout as string | undefined, async (metaLayout?: string) => {
        try {
            const component = metaLayout && await import(`../layouts/${metaLayout}.vue` as string)
            layout.value = markRaw(component?.default || Default)
        } catch (e) {
            layout.value = markRaw(Default)
        }
    },
    { immediate: true },
)
</script>

