import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundVue from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores/AuthStore.js";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    path: "/poll-list",
    name: "PollList",
    component: () => import("@/views/PollListView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== "Login" && to.name !== "Signup" && !authStore.isUserAuthenticated)
    next({ name: "Login" });
  else next();
});

export default router;
