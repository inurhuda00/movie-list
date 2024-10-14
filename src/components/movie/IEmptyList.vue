<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="mb-6 text-center text-heading-2 font-semibold text-white">Your movie list is empty</h1>
    <router-link to="/protected">
      <IButton>Add a new movie</IButton>
    </router-link>
  </div>
</template>


<script setup>
import IButton from "src/components/IButton.vue";

</script>
