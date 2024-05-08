import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

const baseUrl = process.env.VUE_APP_BASE_URL;

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    isUserAuthenticated: false,
    loginError: null,
    userDetails: null,
  });

  const handleLogin = async (email, password) => {
    try {
      state.loginError = null;
      const res = await axios.post(`${baseUrl}user/login`, {
        email,
        password,
      });
      if (res?.status === 200) {
        const data = res?.data;
        state.userDetails = data?.user;
        state.isUserAuthenticated = true;
        localStorage.setItem("token", data?.token);
        router.push("/poll-list");
      }
    } catch (e) {
      state.loginError = e?.response?.data?.message;
    }
  };

  return {
    handleLogin,
    ...toRefs(state),
  };
});
