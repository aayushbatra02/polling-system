import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    loginError: null,
    userDetails: null,
    loading: false,
  });

  const loginUser = async (email, password) => {
    try {
      state.loading = true;
      state.loginError = null;
      const res = await axios.post(`user/login`, {
        email,
        password,
      });
      if (res?.status === 200) {
        const data = res?.data;
        state.userDetails = data?.user;
        localStorage.setItem("token", data?.token);
        router.push("/");
      }
    } catch (e) {
      state.loginError = e?.response?.data?.message;
    } finally {
      state.loading = false;
    }
  };

  return {
    loginUser,
    ...toRefs(state),
  };
});
