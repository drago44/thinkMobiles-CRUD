<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  defaultClass: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'transparent',
    validator: function (value) {
      return ['default', 'border', 'logout', 'menu', 'loading'].indexOf(value) !== -1;
    }
  }
});

const variantClass = computed(() => {
  return {
    'button--transparent': props.variant === 'transparent',
    'button--border': props.variant === 'border',
    'button--logout': props.variant === 'logout',
    'button--menu-icon': props.variant === 'menu',
    'button--loading': props.loading === true
  };
});
</script>

<template>
  <button :disabled="loading || disabled" :class="[defaultClass, variantClass]">
    <slot />
  </button>
</template>

<style lang="scss">

</style>
