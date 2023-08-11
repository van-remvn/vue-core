<template>
  <vue3-progress-bar />

  <div v-if="appStore.isCompleteApp">
    <AppSetupLayout />
  </div>
</template>

<script setup lang="ts">
import AppSetupLayout from "@/views/layouts/AppSetupLayout.vue";
import type { AuthStore } from "@/stores/authStore";
import { useAuthStore } from "@/stores/authStore";
import type { AppStore } from "@/stores/appStore";
import { useAppStore } from "@/stores/appStore";
import useInitApp from "@/composables/useInitApp";
import useInitFlowbite from "@/composables/useInitFlowbite";

const authStore: AuthStore = useAuthStore();
const appStore: AppStore = useAppStore();
const { initLanguageForApp } = useInitApp();
const { initFlowbite } = useInitFlowbite();

onBeforeMount(async () => {
  await initLanguageForApp();
});

onMounted(() => {
  // authStore.me()
});
</script>

<style scoped></style>
