import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    movie: null,
    loading: false,
    errors: null,
  }),
  actions: {
    clearErrors() {
      this.errors = null;
    },
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await api.get("/api/movies");
        this.movies = response.data;
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
      } catch (error) {
        this.errors = error.response?.data?.message || "Failed to create movie";
      } finally {
        this.loading = false;
      }
    },

    async updateMovie(id, movieData) {
      this.loading = true;
      try {
        const formData = new FormData();
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
        this.movie = response.data;
      } catch (error) {
        this.errors = error.response?.data?.message || "Failed to update movie";
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
