import { createRouter, createWebHashHistory } from "vue-router";
import { storeToRefs } from "pinia";
import NotFoundVue from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    name: "PollList",
    component: () => import("@/views/PollListView.vue"),
  },
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
    path: "/add-poll",
    name: "AddPoll",
    component: () => import("@/views/AddPollView.vue"),
  },
  {
    path: "/edit-poll/:id",
    name: "EditPoll",
    component: () => import("@/views/AddPollView.vue"),
  },

  {
    path: "/create-user",
    name: "CreateUser",
    component: () => import("@/views/AddPollView.vue"),
  },
  {
    path: "/list-users",
    name: "ListUsers",
    component: () => import("@/views/AddPollView.vue"),
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
  const { user } = storeToRefs(authStore);
  if (to.name !== "Login" && to.name !== "Signup" && !user.value) {
    next({ name: "Login" });
  } else if ((to.name === "Login" || to.name === "Signup") && user.value) {
    next({ name: "PollList" });
  } else {
    next();
  }
});

export default router;
