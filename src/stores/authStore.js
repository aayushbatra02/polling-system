import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs, watchEffect } from "vue";
import router from "@/router";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    loginError: null,
    loading: false,
    user: null,
    token: null,
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
        router.push("/");
        const data = res?.data;
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        state.user = data?.user;
        state.token = data?.token;
      }
    } catch (e) {
      state.loginError = e?.response?.data?.message;
    } finally {
      state.loading = false;
    }
  };

  watchEffect(() => {
    state.user = JSON.parse(localStorage.getItem("user"));
    state.token = localStorage.getItem("token");
  });
  return {
    loginUser,
    ...toRefs(state),
  };
});
