export const useSortList = () => {
  const sortedbyASC = ref(true);

  const sortList = (array, sortBy) => {
    if (sortedbyASC.value) {
      array.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
      sortedbyASC.value = false;
    } else {
      array.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
      sortedbyASC.value = true;
    }
  };

  return { sortList };
};
