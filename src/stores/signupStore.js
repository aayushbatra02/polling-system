import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useSignupStore = defineStore("signupStore", () => {
  const state = reactive({
    roles: [],
    loading: false,
    error: null,
    isUserSignedup: false,
  });

  const getRoles = async () => {
    try {
      const res = await axios.get(`role/list`);
      state.roles = res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const signupUser = async (userData, type) => {
    try {
      state.error = null;
      state.loading = true;
      const res = await axios.post(`user/${type}`, userData);
      if (res?.status === 200) {
        state.isUserSignedup = true;
      }
    } catch (e) {
      const errorMessage =
        type === "register" ? e?.response?.data : e?.response?.data?.message;
      if (
        errorMessage.includes("Duplicate") ||
        errorMessage.includes("500 error")
      ) {
        state.error = `Email Id already exists.`;
      } else {
        state.error = errorMessage;
      }
    } finally {
      state.loading = false;
    }
  };

  return { getRoles, signupUser, ...toRefs(state) };
});
