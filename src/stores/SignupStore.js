import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

const baseUrl = process.env.VUE_APP_BASE_URL;

export const useSignupStore = defineStore("authStore", () => {
  const state = reactive({
    roles: [],
    loading: false,
    error: null,
    signupMessage: null,
    user:null
  });

  const getRoles = async () => {
    try {
      const res = await axios.get(`${baseUrl}role/list`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      state.roles = res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignup = async (userData) => {
    try {
      state.error = null
      state.loading = true;
      const res = await axios.post(`${baseUrl}user/register`, userData);
      if(res?.status === 200) {
        const data = res.data;
        state.signupMessage = data.message,
        state.user = data.response
      }
    } catch (e) {
      state.error = e.response.data
    } finally {
      state.loading = false;
    }
  };

  return { getRoles, handleSignup, ...toRefs(state) };
});
