<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  as: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="form__group">
    <label class="form__label">{{ label }}</label>
    <VeeField
      v-if="props.type === 'tel'"
      class="form__field"
      :name="name"
      :type="type"
      :as="as"
      :placeholder="placeholder"
      v-mask="'+__ (___) ___ __ __'"
    />
    <VeeField
      v-else
      class="form__field"
      :name="name"
      :type="type"
      :as="as"
      :placeholder="placeholder"
    />
    <ErrorMessage :name="name" class="danger" />
  </div>
</template>
