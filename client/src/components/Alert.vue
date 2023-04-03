<script setup>
import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { showAlert, alertVariant, alertMsg } = storeToRefs(alertStore);
</script>

<template>
  <div v-if="showAlert" class="alert">
    <div class="alert__container">
      <div class="alert__message" :class="alertVariant">
        {{ alertMsg }}
      </div>
    </div>
  </div>
</template>