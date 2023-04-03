import { createRouter, createWebHistory } from 'vue-router';
import { useAlertStore, useAuthStore } from '@/stores';

import { Account, Login, Register } from '@/views/account';
import { Home, AddUser, EventList, UserList, AddEvent } from '@/views/home';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '', component: UserList },
        { path: 'add', component: AddUser },
        { path: 'edit/:id', component: EventList },
        { path: 'edit/:id/add', component: AddEvent }
      ]
    },
    {
      path: '/account',
      component: Account,
      children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ['/account/login', '/account/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    return '/account/login';
  }
});
