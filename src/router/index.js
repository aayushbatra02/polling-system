import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundVue from "@/views/NotFoundView.vue";

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
  if (
    to.name !== "Login" &&
    to.name !== "Signup" &&
    !localStorage.getItem("isUserAuthenticated")
  ) {
    next({ name: "Login" });
  } else if (
    (to.name == "Login" || to.name == "Signup") &&
    localStorage.getItem("isUserAuthenticated")
  ) {
    next({ name: "PollList" });
  } else {
    next();
  }
});

export default router;
