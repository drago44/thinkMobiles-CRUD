<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
  <header class="header" v-show="authStore.user">
    <div class="header__container">
      <RouterLink to="/" class="header__logo" active-class="no-active">CRUD</RouterLink>
      <Nav class="header__menu" />
    </div>
  </header>
</template>

<style lang="scss">
.active {
  color: $accentColor;
}
</style>
