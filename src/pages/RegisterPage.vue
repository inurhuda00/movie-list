<template>
  <div class="flex min-h-screen items-center justify-center bg-background font-montserrat">
    <div class="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-[24px] px-4 xl:px-[120px]">
      <div class="col-span-12 md:col-start-4 md:col-span-5 xl:col-span-4 xl:col-start-5">
        <h1 class="mb-8 text-center text-heading-2 font-semibold text-white">Register</h1>
        <form @submit.prevent="register" class="grid w-full grid-cols-1 gap-6">
          <label class="block">
            <InputField v-model="registerForm.name" placeholder="Name" :error="errors?.name ? errors.name[0] : null"
              required />
          </label>
          <label class="block">
            <InputField type="email" v-model="registerForm.email" placeholder="Email"
              :error="errors?.email ? errors.email[0] : null" required />
          </label>
          <label class="block">
            <InputField type="password" v-model="registerForm.password" placeholder="Password"
              :error="errors?.password ? errors.password[0] : null" required />
          </label>
          <label class="block">
            <InputField type="password" v-model="registerForm.password_confirmation" placeholder="Confirm Password"
              :error="errors?.password_confirmation ? errors.password_confirmation[0] : null" required />
          </label>
          <IButton type="submit" :disabled="loading">Register</IButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "RegisterPage",
});

import { ref } from "vue";
import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import InputField from 'components/InputField.vue';
import IButton from "src/components/IButton.vue";

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
