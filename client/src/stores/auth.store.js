const { request } = useHttp();
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));

  const registerUser = async (values) => {
    const body = JSON.stringify(values);
    const response = await request(`${BASE_URL}/api/register`, 'POST', body);
  };

  const loginUser = async (values) => {
    const body = JSON.stringify(values);
    const response = await request(`${BASE_URL}/api/login`, 'POST', body);

    user.value = response;
    localStorage.setItem('user', JSON.stringify(user.value));
    router.push('/');
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    router.push('/account/login');
  };

  return {
    user,
    registerUser,
    loginUser,
    logout
  };
});
