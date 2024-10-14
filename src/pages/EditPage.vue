<template>
  <div class="relative flex min-h-screen font-montserrat isolate">
    <div class="mx-auto w-full max-w-[1440px] grid-cols-12 gap-[24px] px-4 xl:px-[120px] my-32">
      <section class="flex justify-between items-center py-4 lg:pb-[7.5rem]">
        <h1 class="text-heading-2 font-bold text-white mb-8">Create a new movie {{ id }}</h1>
      </section>
      <section class="grid grid-cols-1 md:grid-cols-2 gap-32 mb-[7.5rem]">
        <div
          class="relative isolate border-2 border-dashed bg-input border-white rounded-lg aspect-[2/3] flex flex-col items-center justify-center text-white cursor-pointer">
          <div class="absolute inset-0" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop" />
          <input v-if="!imagePreview" type="file" ref="fileInput" class="hidden" @change="handleFileChange"
            accept="image/*">
          <template v-if="!imagePreview">
            <svg class="mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3_346)">
                <path
                  d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                  fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_3_346">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p class="text-body-large">Drop an image here</p>
          </template>
          <cropper v-else :src="imagePreview" :resizeImage="{ wheel: false }" :stencil-size="{
            width: 750,
            height: 1000
          }" :stencil-props="{
            handlers: {},
            movable: false,
            resizable: false,
            aspectRatio: 2 / 3
          }" foregroundClass="bg-background opacity-100" image-restriction="stencil"
            class="w-full h-auto aspect-[2/3]  object-cover rounded-sm" />

          <div class="flex absolute p-4 top-0 right-0 items-center justify-start gap-x-2 ">
            <IButton type="button" outline v-if="movieForm.thumbnail" size="sm" @click="resetImage">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </IButton>
          </div>
        </div>

        <form class="max-w-sm" @submit.prevent="submit">
          <label class="block mb-6">
            <InputField type="text" v-model="movieForm.title" placeholder="Title"
              :error="errors?.title ? errors.title[0] : null" />
          </label>
          <label class="block mb-16 w-64">
            <InputField type="text" v-model="movieForm.year" placeholder="Publish Year"
              :error="errors?.year ? errors.year[0] : null" />
          </label>

          <div class="grid grid-cols-2 gap-x-4">
            <IButton @click="cancel" outline> Cancel </IButton>
            <IButton type="submit" :disabled="loading">
              Submit
            </IButton>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "AddPage",
});

import IButton from 'src/components/IButton.vue';
import { computed, onMounted, ref } from 'vue';

import { useMovieStore } from 'stores/movie';
import InputField from 'src/components/InputField.vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const movieForm = ref({
  title: "",
  year: "",
  thumbnail: null,
});

const fileInput = ref(null);
const imagePreview = ref(null);

const movieStore = useMovieStore();
const router = useRouter();
const route = useRoute();

const { errors, loading } = storeToRefs(movieStore);

const id = computed(() => route.params.id);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  movieForm.value.thumbnail = file;
  previewImage(file);
};

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0];
  movieForm.value.thumbnail = file;
  previewImage(file);
};

const previewImage = (file) => {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const resetImage = () => {
  imagePreview.value = null;
  fileInput.value.value = null;
};

const cancel = () => {
  movieForm.value = {
    title: "",
    year: "",
    thumbnail: null,
  };
  imagePreview.value = null;
  router.push({ name: "Home" });
};

const submit = async () => {
  movieStore.clearErrors()
  await movieStore.createMovie(movieForm.value);

  if (!errors.value || Object.keys(errors.value).length === 0) {
    cancel();
  }

};

onMounted(async () => {
  await movieStore.fetchMovie(id.value);
  const movieData = movieStore.movie;
  if (movieData) {
    movieForm.value.title = movieData.title;
    movieForm.value.year = movieData.year;
    imagePreview.value = movieData.thumbnail;
  }
});
</script>
