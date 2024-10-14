import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    movie: null,
    loading: false,
    errors: null,
    meta: null
  }),
  actions: {
    clearErrors() {
      this.errors = null;
    },
    async fetchMovies(page = 1) {
      this.loading = true;
      try {
        const response = await api.get(`/api/movies?page=${page}`);
        this.movies = response.data.data;
        this.meta = response.data.meta;
      } catch (error) {
        this.errors = error.response?.data?.message || "Failed to fetch movies";
      } finally {
        this.loading = false;
      }
    },

    async fetchMovie(id) {
      this.loading = true;
      try {
        const response = await api.get(`/api/movies/${id}`);
        this.movie = response.data;
      } catch (error) {
        this.errors = error.response?.data?.message || "Failed to fetch movie";
      } finally {
        this.loading = false;
      }
    },

    async createMovie(movieData) {
      this.loading = true;
      try {
        await api.get("/sanctum/csrf-cookie");

        const formData = new FormData();
        formData.append('title', movieData.title);
        formData.append('year', movieData.year);

        if (movieData.thumbnail) {
          formData.append('thumbnail', movieData.thumbnail);
        }

        const response = await api.post("/api/movies", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          this.errors = error.response?.data?.message || "Failed to create movie";
          console.error("Unexpected error:", error);
        }
      } finally {
        this.loading = false;
      }
    },

    async updateMovie(id, movieData) {
      this.loading = true;
      try {
        await api.get("/sanctum/csrf-cookie");

        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', movieData.title);
        formData.append('year', movieData.year);
        if (movieData.thumbnail) {
          formData.append('thumbnail', movieData.thumbnail);
        }

        const response = await api.post(`/api/movies/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
        this.movie = response.data;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          this.errors = error.response?.data?.message || "Failed to update movie";
          console.error("Unexpected error:", error);
        }
      } finally {
        this.loading = false;
      }
    },

    async deleteMovie(id) {
      this.loading = true;
      try {
        await api.delete(`/api/movies/${id}`);
        this.movies = this.movies.filter(movie => movie.id !== id);
      } catch (error) {
        this.errors = error.response?.data?.message || "Failed to delete movie";
      } finally {
        this.loading = false;
      }
    },
  },
});
