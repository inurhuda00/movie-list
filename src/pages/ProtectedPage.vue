<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Secret Page</h1>
      <pre>{{ formattedUserData }}</pre>
      <router-link to="/" class="q-btn">Back To Home</router-link>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "stores/auth";
import { computed } from "vue";

defineOptions({
  name: "ProtectedPage",
});

const authStore = useAuthStore();

const formattedUserData = computed(() => {
  return JSON.stringify(authStore.user, null, 2);
});
</script>
