import { boot } from "quasar/wrappers";
import { useAuthStore } from "stores/auth";

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const restrictedRoutes = ["/login", "/register"];

    if (authStore.isAuthenticated && restrictedRoutes.includes(to.path)) {
      return next("/");
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next({ name: "Login" });
    }

    next();
  });
});
