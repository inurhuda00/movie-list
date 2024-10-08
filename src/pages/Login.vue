<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="login">
      <q-input
        v-model="loginForm.email"
        label="Email"
        type="email"
        :error="!!errors?.email"
        :error-message="errors?.email ? errors.email[0] : ''"
      />
      <q-input
        v-model="loginForm.password"
        label="Password"
        type="password"
        :error="!!errors?.password"
        :error-message="errors?.password ? errors.password[0] : ''"
      />
      <q-btn
        type="submit"
        :disabled="loading"
        label="Login"
        class="q-mt-md"
        color="primary"
      />
      <p style="margin-top: 0.5rem">
        Don't have an account?
        <router-link to="/register">Register now</router-link>
      </p>
    </q-form>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "LoginPage",
});

import { ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const loginForm = ref({
  email: "",
  password: "",
});

const authStore = useAuthStore();
const router = useRouter();

const { errors, loading } = storeToRefs(authStore);

async function login() {
  authStore.clearErrors();

  await authStore.login({
    email: loginForm.value.email,
    password: loginForm.value.password,
  });

  if (!errors.value || Object.keys(errors.value).length === 0) {
    router.push({ name: "Home" });
  }
}
</script>
