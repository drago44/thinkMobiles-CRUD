<script setup>
import { useAlertStore} from '@/stores';
const alertStore = useAlertStore();
const { inSubmission } = storeToRefs(alertStore);

const props = defineProps({
  title: {
    type: String,
    default: 'title'
  },
  btn: {
    type: String,
    default: 'btn'
  },
  link: {
    type: String,
    default: 'link to'
  },
  to: {
    type: String,
    default: '/'
  }
});
</script>

<template>
  <VeeForm class="form">
    <h1>{{ title }}</h1>
    <slot />
    <div class="form__nav">
      <BaseButton variant="border" :disabled="inSubmission" :loading="inSubmission">{{
        btn
      }}</BaseButton>
      <RouterLink :to="to" active-class="no-active">{{ link }}</RouterLink>
    </div>
  </VeeForm>
</template>
