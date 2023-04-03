const { request } = useHttp();
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useEventsStore = defineStore('events', () => {
  const userEvents = ref([]);

  const createUserEvent = async (id, values) => {
    const body = JSON.stringify({ id, values });
    const response = await request(`${BASE_URL}/api/events/add`, 'POST', body);
  };

  const getEventsById = async (id) => {
    const response = await request(`${BASE_URL}/api/events/${id}`);
    userEvents.value = response;
  };

  return {
    userEvents,
    createUserEvent,
    getEventsById
  };
});
