const { request } = useHttp();
const BASE_URL = import.meta.env.VITE_BASE_URL;

const _userSchema = (user) => {
  return {
    _id: user._doc._id,
    email: user._doc.email,
    first_name: user._doc.first_name,
    last_name: user._doc.last_name,
    phone_number: user._doc.phone_number,
    events: user.events
  };
};

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);
  const user = ref([]);

  const getAllUsers = async () => {
    const response = await request(`${BASE_URL}/api/users`);
    users.value = response.map((user) => _userSchema(user));
  };

  const getUserById = async (id) => {
    const response = await request(`${BASE_URL}/api/users/${id}`);
    user.value = response;
  };

  return {
    users,
    user,
    getAllUsers,
    getUserById
  };
});
