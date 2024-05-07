import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    isUserAuthenticated: false,
  });

  return {
    ...toRefs(state),
  };
});
