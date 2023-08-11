<template>
    <div id="dashboard">
        <div class="">
            <h3>Dashboard</h3>
        </div>
    </div>
</template>

<script lang="ts" setup name="TheDashboard">
import Form from "./components/form.vue";
import FormJsx from "./form";
import type { AppStore } from "@/stores/appStore";
import { useAppStore } from "@/stores/appStore";
import type { AuthStore } from "@/stores/authStore";
import { useAuthStore } from "@/stores/authStore";
import useInitApp from "@/composables/useInitApp";

const { locale, t } = useI18n();
const appStore: AppStore = useAppStore();
const authStore: AuthStore = useAuthStore();
const { changeLanguage } = useInitApp();


onMounted(() => {
})

</script>

<style scoped lang="scss"></style>
