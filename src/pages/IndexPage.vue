<template>
  <q-page class="flex flex-center">
    <router-link to="/login" class="q-btn" v-if="!isAuthenticated"
      >Login Page</router-link
    >
    <router-link to="/protected" class="q-btn">
      Go to Protected Page</router-link
    >
    <q-btn @click="logout" v-if="isAuthenticated">Logout</q-btn>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
defineOptions({
  name: "IndexPage",
});

const authStore = useAuthStore();
const router = useRouter();

const { isAuthenticated } = storeToRefs(authStore);

async function logout() {
  await authStore.logout();
  router.push({ name: "Login" });
}
</script>
