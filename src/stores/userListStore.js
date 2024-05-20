import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useUserListStore = defineStore("userLIstStore", () => {
  const state = reactive({
    loading: false,
  });
  
  const getUsers = async (pageNo, limit) => {
    try {
      state.loading = true;
      const res = await axios.get(`user/list/${pageNo}?limit=${limit}`);
      return res.data.rows;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      state.loading = false;
    }
  };

  return { getUsers, ...toRefs(state) };
});
