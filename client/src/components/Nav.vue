<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const menuOpen = ref(false);
</script>

<template>
  <nav class="menu">
    <ul class="menu__list" :class="{ 'menu-open': menuOpen }">
      <li class="menu__item">
        <RouterLink to="/" class="menu__link">Home</RouterLink>
      </li>
    </ul>
    <div class="menu__auth">
      <BaseButton variant="logout" @click="authStore.logout"><span>Log out</span></BaseButton>
    </div>
    <BaseButton
      type="button"
      variant="menu"
      :class="{ 'menu-open': menuOpen }"
      @click.prevent="menuOpen = !menuOpen"
    >
      <span></span>
    </BaseButton>
  </nav>
</template>