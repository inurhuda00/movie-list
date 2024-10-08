const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/protected",
        name: "Protected",
        component: () => import("pages/Protected.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
