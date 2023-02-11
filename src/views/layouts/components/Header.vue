<template>
    <div class="nk-header nk-header-fluid is-regular is-theme">
        <div class="container-xl wide-xl">
            <div class="nk-header-wrap">
                <div class="nk-menu-trigger me-sm-2 d-lg-none">
                    <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav">
                        <em class="icon ni ni-menu"></em>
                    </a>
                </div>
                <div class="nk-header-brand">
                    <a href="/assets/index.html" class="logo-link">
                        <img class="logo-light logo-img" src="https://dashlite.net/demo6/images/logo.png" srcset="https://dashlite.net/demo6/images/logo2x.png 2x" alt="logo">
                        <img class="logo-dark logo-img" src="https://dashlite.net/demo6/images/logo-dark.png" srcset="https://dashlite.net/demo6/images/logo-dark2x.png 2x" alt="logo-dark">
                    </a>
                </div>
                <div class="nk-header-menu" data-content="headerNav">
                    <div class="nk-header-mobile">
                        <div class="nk-header-brand">
                            <a href="/demo6/index.html" class="logo-link">
                                <img class="logo-light logo-img" src="https://dashlite.net/demo6/images/logo.png" srcset="https://dashlite.net/demo6/images/logo2x.png 2x" alt="logo">
                                <img class="logo-dark logo-img" src="https://dashlite.net/demo6/images/logo-dark.png" srcset="https://dashlite.net/demo6/images/logo-dark2x.png 2x" alt="logo-dark">
                            </a>
                        </div>
                        <div class="nk-menu-trigger me-n2">
                            <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav">
                                <em class="icon ni ni-arrow-left"></em>
                            </a>
                        </div>
                    </div>

                    <!-- The Menu Header -->
                    <TheMenuHeader />

                </div>
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">

                        <!-- The Notifice Header -->
                        <TheNotificeHeader />

                        <!-- The Profile Header -->
                        <TheProfileHeader />

                        <li class="dropdown language-dropdown d-none d-sm-flex me-n1">
                            <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                <div class="quick-icon">
                                    <img class="icon" src="https://dashlite.net/demo6/images/flags/english-sq.png" alt="">
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-s1">
                                <ul class="language-list">
                                    <li>
                                        <a href="#" class="language-item">
                                            <img src="/assets/images/flags/english.png" alt="" class="language-flag">
                                            <span class="language-name">English</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="language-item">
                                            <img src="/assets/images/flags/spanish.png" alt="" class="language-flag">
                                            <span class="language-name">Español</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="language-item">
                                            <img src="/assets/images/flags/french.png" alt="" class="language-flag">
                                            <span class="language-name">Français</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="language-item">
                                            <img src="/assets/images/flags/turkey.png" alt="" class="language-flag">
                                            <span class="language-name">Türkçe</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="TheHeader">
import TheMenuHeader from './TheMenuHeader.vue'
import TheProfileHeader from './TheProfileHeader.vue'
import TheNotificeHeader from './TheNotificeHeader.vue'
import { AuthStore, useAuthStore } from '@/stores/authStore'

const authStore: AuthStore = useAuthStore()

onMounted(()=> {
    authStore.me()
})

</script>
