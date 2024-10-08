<template>
  <q-page class="flex flex-center">
    <q-form @submit="register">
      <q-input
        v-model="registerForm.name"
        label="Name"
        :error="errors?.name ? true : false"
        :error-message="errors?.name ? errors.name[0] : ''"
      />
      <q-input
        v-model="registerForm.email"
        label="Email"
        type="email"
        :error="errors?.email ? true : false"
        :error-message="errors?.email ? errors.email[0] : ''"
      />
      <q-input
        v-model="registerForm.password"
        label="Password"
        type="password"
        :error="errors?.password ? true : false"
        :error-message="errors?.password ? errors.password[0] : ''"
      />
      <q-input
        v-model="registerForm.password_confirmation"
        label="Confirm Password"
        type="password"
      />
      <q-btn
        type="submit"
        :disabled="loading"
        label="Register"
        class="q-mt-md"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "RegisterPage",
});

import { ref } from "vue";
import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const registerForm = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const authStore = useAuthStore();
const router = useRouter();

const { errors, loading } = storeToRefs(authStore);

async function register() {
  authStore.clearErrors();

  await authStore.register({
    name: registerForm.value.name,
    email: registerForm.value.email,
    password: registerForm.value.password,
    password_confirmation: registerForm.value.password_confirmation,
  });

  if (!errors.value || Object.keys(errors.value).length === 0) {
    router.push({ name: "Home" });
  }
}
</script>
