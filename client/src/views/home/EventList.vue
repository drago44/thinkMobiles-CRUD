<script setup>
import { useRoute } from 'vue-router';
import { useAlertStore, useAuthStore, useEventsStore, useUsersStore } from '@/stores';

const usersStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const eventsStore = useEventsStore();

const { getEventsById } = eventsStore;
const { userEvents } = storeToRefs(eventsStore);

const { paginate, total, currentPage, itemsPerPage, onPageChange } = usePagination();
const { sortList } = useSortList();

const route = useRoute();
const userId = ref(route.params.id);

const userToPaginate = async () => {
  alertStore.wait('Please wait! Look for user events...');

  try {
    await getEventsById(userId.value);
    itemsPerPage.value = 2;
  } catch (e) {
    alertStore.error(error);
    return;
  }

  alertStore.clear();
};

const paginatedData = computed(() => paginate(userEvents.value));
const totalPages = computed(() => total(userEvents.value));

const sortItem = (itemName) => {
  sortList(userEvents.value, itemName);
};

onMounted(() => userToPaginate());
</script>

<template>
  <section class="event-list">
    <div class="event-list__container">
      <p class="hello">This is {{ usersStore.user.first_name }} events!</p>
      <p class="hello danger">
        {{
          userId !== authStore.user._id
            ? 'Please be aware that you have the ability to create events for a user other than yourself.'
            : ''
        }}
      </p>
      <RouterLink :to="`/edit/${userId}/add`" class="button button--border"
        >Create new event</RouterLink
      >
      <BaseTable class="m-top">
        <template v-slot:top>
          <tr>
            <th @click="sortItem('title_event')" scope="col">Title &#8597;</th>
            <th @click="sortItem('descr_event')" scope="col">Description &#8597;</th>
            <th @click="sortItem('start_data_event')" scope="col">Start Date &#8597;</th>
            <th @click="sortItem('end_data_event')" scope="col">End Date &#8597;</th>
          </tr>
        </template>
        <template v-slot:bottom>
          <tr v-for="(event, index) in paginatedData" key="event._id">
            <td data-label="Title">
              {{ event.title_event }}
            </td>
            <td data-label="Description">
              {{ event.descr_event }}
            </td>
            <td data-label="Start Date">
              {{ event.start_data_event }}
            </td>
            <td data-label="End Date">
              {{ event.end_data_event }}
            </td>
          </tr>
        </template>
      </BaseTable>
      <BasePagination :totalPages="totalPages" :page="currentPage" @page-change="onPageChange" />
    </div>
  </section>
</template>

<style lang="scss">
.m-top {
  margin-top: rem(20);
}
.pagination {
  margin: rem(20) auto 0 auto;
  max-width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: rem(10);
  button {
    border: rem(1) solid black;
  }
}
</style>
