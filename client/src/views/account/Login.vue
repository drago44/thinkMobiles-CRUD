<script setup>
import { useAlertStore, useAuthStore } from '@/stores';

const alertStore = useAlertStore();

const authStore = useAuthStore();
const { loginUser } = authStore;

const logSchema = ref({
  email: 'required|min:2|max:100|email',
  password: 'required|min:6|max:100'
});

const login = async (values) => {
  alertStore.wait('Please wait! We are logging you in.');

  try {
    await loginUser(values);
  } catch (error) {
    alertStore.error(error);
    return;
  }

  alertStore.success('Success! You are now logged in');
};
</script>

<template>
  <BaseForm
    title="Login"
    btn="Sign in"
    link="Register"
    to="register"
    :validation-schema="logSchema"
    @submit="login"
  >
    <BaseField name="email" type="email" label="Email" placeholder="example@gmail.com" />
    <BaseField name="password" type="password" label="Password" placeholder="******" />
  </BaseForm>
</template>
