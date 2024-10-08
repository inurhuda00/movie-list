import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    errors: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  actions: {
    clearErrors() {
      this.errors = null;
    },
    async fetchUser() {
      this.loading = true;
      try {
        const response = await api.get("/api/user");

        this.user = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
    async login(credentials) {
      this.loading = true;
      try {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/api/login", credentials);

        await this.fetchUser();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        this.loading = false;
      }
    },
    async register(credentials) {
      this.loading = true;
      this.errors = {};
      try {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/api/register", credentials);

        await this.fetchUser();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await api.post("/api/logout");
        this.user = null;
      } catch (error) {
        console.error("logout error:", error);
      }
    },
  },
  persist: true,
});
