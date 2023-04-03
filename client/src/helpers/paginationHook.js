export const usePagination = () => {
  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const paginate = (array) => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;

    return array.slice(startIndex, endIndex);
  };

  const total = (arrayLength) => {
    const result = Math.ceil(arrayLength.length / itemsPerPage.value);

    return result;
  };

  const onPageChange = (page) => {
    currentPage.value = page;
  };

  return { currentPage, itemsPerPage, paginate, total, onPageChange };
};
