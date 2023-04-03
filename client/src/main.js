import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

import Mask from './directives/mask';

import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';
import '@/plugins/vee-validate.js';

const app = createApp(App);

app.component('VeeForm', VeeForm);
app.component('VeeField', VeeField);
app.component('ErrorMessage', ErrorMessage);

app.use(createPinia());
app.use(router);
app.directive('mask', Mask);

app.mount('#app');
