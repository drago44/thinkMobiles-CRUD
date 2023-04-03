<script setup>
import { useAlertStore, useAuthStore } from '@/stores';

const alertStore = useAlertStore();

const authStore = useAuthStore();
const { registerUser } = authStore;

const regSchema = ref({
  first_name: 'required|min:2|max:100|alpha_spaces',
  last_name: 'required|min:2|max:100|alpha_spaces',
  email: 'required|min:2|max:100|email',
  phone_number: 'required',
  password: 'required|min:6|max:100',
  confirm_password: 'password_mismatch:@password'
});

const register = async (values) => {
  alertStore.wait('Please wait! Your account is being created.');

  try {
    await registerUser(values);
  } catch (error) {
    alertStore.error(error);
    return;
  }

  alertStore.success('Success! Your account has been created');
};
</script>

<template>
  <BaseForm
    title="Registration"
    btn="Register new account"
    link="Login"
    to="login"
    :validation-schema="regSchema"
    @submit="register"
  >
    <BaseField name="first_name" type="text" label="First Name" placeholder="Alex" />
    <BaseField name="last_name" type="text" label="Last Name" placeholder="Smith" />
    <BaseField name="email" type="email" label="Email" placeholder="example@gmail.com" />
    <BaseField name="phone_number" type="tel" label="Phone" placeholder="+380501231212" />
    <BaseField name="password" type="password" label="Password" placeholder="******" />
    <BaseField
      name="confirm_password"
      type="password"
      label="Confirm password"
      placeholder="******"
    />
  </BaseForm>
</template>
