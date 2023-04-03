<script setup>
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  maxPagesToShow: {
    type: Number,
    default: 5
  }
});

const emits = defineEmits(['page-change']);

const showPages = computed(() => {
  const middlePage = Math.ceil(props.maxPagesToShow / 2);
  const startPage = Math.max(props.page - middlePage + 1, 1);
  const endPage = Math.min(startPage + props.maxPagesToShow - 1, props.totalPages);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const nextPage = () => {
  if (props.page < props.totalPages) {
    emits('page-change', props.page + 1);
  }
};

const backPage = () => {
  if (props.page > 1) {
    emits('page-change', props.page - 1);
  }
};

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= props.totalPages && pageNumber !== props.page) {
    emits('page-change', pageNumber);
  }
};
</script>

<template>
  <div class="pagination">
    <BaseButton v-if="page !== 1" @click="backPage" variant="border">prev</BaseButton>
    <BaseButton
      v-if="showPages.length > 1"
      v-for="item in showPages"
      :key="item"
      @click="() => goToPage(item)"
      variant="border"
    >
      {{ item }}
    </BaseButton>
    <BaseButton v-if="page !== totalPages && totalPages !== 0" @click="nextPage" variant="border">
      next
    </BaseButton>
  </div>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
</style>
