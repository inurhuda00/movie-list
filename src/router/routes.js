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
        component: () => import("src/pages/ProtectedPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("src/pages/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("src/pages/RegisterPage.vue"),
      },
      {
        path: "/add",
        name: "Add",
        component: () => import("src/pages/AddPage.vue"),
      },
      {
        path: "/edit/:id",
        name: "Edit",
        component: () => import("src/pages/EditPage.vue"),
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
