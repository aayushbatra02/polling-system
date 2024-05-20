import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useUserListStore = defineStore("userLIstStore", () => {
  const state = reactive({
    users: [],
    loading: false,
  });

  const getUsers = async (pageNo, limit) => {
    try {
      state.loading = true;
      const res = await axios.get(`user/list/${pageNo}?limit=${limit}`);
      state.users = res.data.rows
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  return { getUsers, ...toRefs(state) };
});
