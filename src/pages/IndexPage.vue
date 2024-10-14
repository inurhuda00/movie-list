<template>
  <div class="relative flex min-h-screen font-montserrat isolate">
    <div class="mx-auto w-full max-w-[1440px] grid-cols-12 gap-[24px] px-4 xl:px-[120px] my-32">
      <section class="flex justify-between items-center py-4 lg:pb-[7.5rem]">
        <router-link to="/add">
          <IButton variant="ghost" class="flex items-center gap-x-2">
            <h1 class="text-heading-2 text-white font-bold">My movies</h1>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3_196)">
                <path
                  d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                  fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_3_196">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IButton>
        </router-link>

        <IButton variant="ghost" @click="logout" class="flex items-center space-x-4">
          <span class="text-white font-bold text-body-regular">
            Logout
          </span>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7_232)">
              <path
                d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_7_232">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </IButton>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-[7.5rem]">
        <div class="bg-gray-900 rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Movie 1" class="w-full aspect-[2/3] object-cover">
          <div class="p-4">
            <h3 class="text-white text-body-regular mb-3 font-semibold">Movie 1</h3>
            <p class="text-gray-400 text-body-small">2021</p>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Movie 1" class="w-full aspect-[2/3] object-cover">
          <div class="p-4">
            <h3 class="text-white text-body-regular mb-3 font-semibold">Movie 1</h3>
            <p class="text-gray-400 text-body-small">2021</p>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Movie 1" class="w-full aspect-[2/3] object-cover">
          <div class="p-4">
            <h3 class="text-white text-body-regular mb-3 font-semibold">Movie 1</h3>
            <p class="text-gray-400 text-body-small">2021</p>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Movie 1" class="w-full aspect-[2/3] object-cover">
          <div class="p-4">
            <h3 class="text-white text-body-regular mb-3 font-semibold">Movie 1</h3>
            <p class="text-gray-400 text-body-small">2021</p>
          </div>
        </div>
      </section>

      <section class="flex justify-center items-center mt-8 space-x-4 pb-24">
        <button class="bg-gray-700 text-white px-4 py-2 rounded">Prev</button>
        <button class="bg-green-500 text-white px-4 py-2 rounded">1</button>
        <button class="bg-gray-700 text-white px-4 py-2 rounded">2</button>
        <button class="bg-gray-700 text-white px-4 py-2 rounded">Next</button>
      </section>
    </div>
    <!-- <IEmptyList /> -->

    <!-- <div class="flex flex-center gap-x-2 absolute top-0 pt-4">
      <router-link to="/protected">
        <IButton>Go to Protected Page</IButton>
      </router-link>
      <IButton @click="logout" v-if="isAuthenticated">Logout</IButton>
    </div> -->
  </div>

</template>

<script setup>
import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import IButton from "src/components/IButton.vue";

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
