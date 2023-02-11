<template>
    <li class="dropdown user-dropdown order-sm-first">
        <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
            <div class="user-toggle">
                <div class="user-avatar sm">
                    <em class="icon ni ni-user-alt"></em>
                </div>
                <div class="user-info d-none d-xl-block">
                    <div class="user-status">{{ authStore.info ? authStore.info.username : '--' }}</div>
                    <div class="user-name dropdown-indicator">{{ authStore.info ? authStore.info.email : '--' }}</div>
                </div>
            </div>
        </a>
        <div class="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1 is-light">
            <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                <div class="user-card">
                    <div class="user-avatar">
                        <span v-if="authStore.infor">{{ authStore.info?.username.charAt(1) }}</span>
                        <em v-else class="icon ni ni-user-alt"></em>
                    </div>
                    <div class="user-info">
                        <span class="lead-text">{{ authStore.info ? authStore.info.username : '--' }}</span>
                        <span class="sub-text">{{ authStore.info ? authStore.info.email : '--' }}</span>
                    </div>
                    <div class="user-action">
                        <a class="btn btn-icon me-n2" href="/demo6/user-profile-setting.html">
                            <em class="icon ni ni-setting"></em>
                        </a>
                    </div>
                </div>
            </div>
            <div class="dropdown-inner user-account-info">
                <h6 class="overline-title-alt">Account Balance</h6>
                <div class="user-balance">1,494.23
                    <small class="currency currency-usd">USD</small>
                </div>
                <div class="user-balance-sub">Locked
                    <span>15,495.39
                        <span class="currency currency-usd">USD</span>
                    </span>
                </div>
                <a href="#" class="link">
                    <span>Withdraw Balance</span>
                    <em class="icon ni ni-wallet-out"></em>
                </a>
            </div>
            <div class="dropdown-inner">
                <ul class="link-list">
                    <li>
                        <a href="/demo6/user-profile-regular.html">
                            <em class="icon ni ni-user-alt"></em>
                            <span>View Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dem
                        o6/user-profile-setting.html">
                            <em class="icon ni ni-setting-alt"></em>
                            <span>Account Setting</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="dropdown-inner">
                <ul class="link-list">
                    <li>
                        <a href="#">
                            <em class="icon ni ni-signout"></em>
                            <span>Sign out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script lang="ts" setup name="TheProfileHeader">
import { AuthStore, useAuthStore } from '@/stores/authStore'

const authStore: AuthStore = useAuthStore()
</script>
