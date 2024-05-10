import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useSignupStore = defineStore("signupStore", () => {
  const state = reactive({
    roles: [],
    loading: false,
    error: null,
    isUserSignedup: false,
    user: null,
  });

  const getRoles = async () => {
    try {
      const res = await axios.get(`role/list`);
      state.roles = res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const signupUser = async (userData) => {
    try {
      state.error = null;
      state.loading = true;
      const res = await axios.post(`user/register`, userData);
      if (res?.status === 200) {
        const data = res.data;
        state.isUserSignedup = true;
        state.user = data.response;
      }
    } catch (e) {
      const errorMessage = e?.response?.data;
      if (errorMessage.includes("Duplicate")) {
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
