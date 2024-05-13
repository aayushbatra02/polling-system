import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const usePollStore = defineStore("pollStore", () => {
  const state = reactive({
    pollList: [],
    loading: false,
    user: null,
  });

  const getPolls = async () => {
    try {
      state.loading = true;
      const res = await axios.get("poll/list/1?limit=4");
      if (res?.status === 200) {
        state.pollList = res?.data?.rows;
      }
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };
  return {
    getPolls,
    ...toRefs(state),
  };
});
