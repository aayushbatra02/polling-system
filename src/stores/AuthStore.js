import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

const url = "https://c134-119-82-71-56.ngrok-free.app/";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    isUserAuthenticated: false,
    error: null,
    userDetails: null,
  });

  const handleLogin = async (email, password) => {
    try {
      state.error = null;
      const res = await axios.post(`${url}user/login`, {
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
      state.error = e.response.data.message;
    }
  };

  return {
    handleLogin,
    ...toRefs(state),
  };
});
