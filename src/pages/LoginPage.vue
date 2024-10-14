<template>
  <div class="flex min-h-screen items-center justify-center bg-background font-montserrat">
    <div class="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-[24px] px-4 xl:px-[120px]">
      <div class="col-span-12 md:col-start-4 md:col-span-5 xl:col-span-4 xl:col-start-5">
        <h1 class="mb-8 text-center text-heading-2 font-semibold text-white">Sign in</h1>
        <form @submit.prevent="login" class="grid w-full grid-cols-1 gap-6">
          <label class="block">
            <InputField type="email" v-model="loginForm.email" placeholder="Email"
              :error="errors?.email ? errors.email[0] : null" required />
          </label>
          <label class="block">
            <InputField type="password" v-model="loginForm.password" placeholder="Password"
              :error="errors?.password ? errors.password[0] : null" required />
          </label>
          <div class="block">
            <label class="flex items-center justify-center">
              <input type="checkbox" v-model="loginForm.rememberMe"
                class="rounded border-input bg-input text-input shadow-sm focus:border-input focus:ring focus:ring-input focus:ring-opacity-50 focus:ring-offset-0" />
              <span class="ml-2 text-caption text-white">Remember Me </span>
            </label>
          </div>
          <IButton type="submit" :disabled="loading">Login
          </IButton>
          <IButton type="button" :disabled="loading" @click="forceLogin">Login with inurhuda00</IButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "LoginPage",
});

import { ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import InputField from 'components/InputField.vue';
import IButton from "src/components/IButton.vue";

const loginForm = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const authStore = useAuthStore();
const router = useRouter();

const { errors, loading } = storeToRefs(authStore);

async function forceLogin() {
  authStore.clearErrors();
  await authStore.login({
    email: "inurhuda00@gmail.com",
    password: "Nurhud@123",
    rememberMe: true
  });

  if (!errors.value || Object.keys(errors.value).length === 0) {
    router.push({ name: "Home" });
  }
}

async function login() {
  authStore.clearErrors();

  await authStore.login({
    email: loginForm.value.email,
    password: loginForm.value.password,
    rememberMe: loginForm.value.rememberMe
  });

  if (!errors.value || Object.keys(errors.value).length === 0) {
    router.push({ name: "Home" });
  }
}
</script>
