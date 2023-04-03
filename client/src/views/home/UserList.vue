<script setup>
import { useUsersStore, useAlertStore, useAuthStore } from '@/stores';

const alertStore = useAlertStore();
const authStore = useAuthStore();

const usersStore = useUsersStore();
const { getAllUsers, getUserById } = usersStore;
const { users } = storeToRefs(usersStore);

const { paginate, total, currentPage, itemsPerPage, onPageChange } = usePagination();
const { sortList } = useSortList();

const usersToPaginate = async () => {
  alertStore.wait('Please wait! Look for users...');

  try {
    await getAllUsers();
    itemsPerPage.value = 1;
  } catch (e) {
    alertStore.error(error);
    return;
  }

  alertStore.clear();
};

const paginatedData = computed(() => paginate(users.value));
const totalPages = computed(() => total(users.value));

const getUser = async (id) => {
  await getUserById(id);
};

const sortItem = (itemName) => {
  sortList(users.value, itemName);
};

const getNextStartDate = (events) => {
  if (!events || events.length === 0) {
    return '';
  }

  const now = new Date().getTime();
  const nextEvent = events
    .sort((a, b) => {
      const dateA = new Date(a.start_data_event).getTime();
      const dateB = new Date(b.start_data_event).getTime();
      return dateA - dateB;
    })
    .find((event) => new Date(event.start_data_event).getTime() > now);

  if (nextEvent) {
    return nextEvent.start_data_event;
  } else {
    return '';
  }
};

onMounted(() => usersToPaginate());
</script>

<template #default>
  <section class="user-list">
    <div class="user-list__container">
      <p class="hello">Hello, {{ `${authStore.user.first_name} ${authStore.user.last_name}` }}!</p>
      <RouterLink to="/add" class="button button--border">Create user</RouterLink>
      <BaseTable class="m-top">
        <template v-slot:top>
          <tr>
            <th @click="sortItem('first_name')" scope="col">User Name &#8597;</th>
            <th @click="sortItem('email')" scope="col">Emai &#8597;</th>
            <th @click="sortItem('phone_number')" scope="col">Phone number &#8597;</th>
            <th @click="sortItem('events')" scope="col">Event count &#8597;</th>
            <th scope="col">Start Date</th>
          </tr>
        </template>
        <template v-slot:bottom>
          <tr v-for="user in paginatedData" :key="user._id">
            <td data-label="User Name" class="text-big">
              <RouterLink :to="`/edit/${user._id}`" @click="getUser(user._id)"
                ><span>{{ `${user.first_name} ${user.last_name}` }}</span></RouterLink
              >
            </td>
            <td data-label="Email">{{ user.email }}</td>
            <td data-label="Phone number">{{ user.phone_number }}</td>
            <td data-label="Event count">{{ user.events.length }}</td>
            <td data-label="Start Date">
              {{ getNextStartDate(user.events) }}
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

.text-big {
  font-weight: 700;
  transition: background-color ease 0.3s;

  &:hover {
    background-color: rgb(245, 222, 179, 0.3);
  }
}

.hello {
  font-weight: 700;
  margin-bottom: rem(20);
}
</style>
