<template>
  <input v-bind="$attrs" v-model="model" class="mt-1 block h-[45px] w-full rounded-md border-input bg-input px-4 text-white shadow-sm
    placeholder:font-montserrat placeholder:text-white focus:border-input focus:ring focus:ring-input
    focus:ring-opacity-50" :class="{ 'border-error': error }" />
  <div v-if="error" class="text-error mt-1 text-caption">{{ error }}</div>
</template>

<script setup>
import { defineProps } from 'vue';

const model = defineModel()

const { error } = defineProps({
  error: String,
});

</script>
