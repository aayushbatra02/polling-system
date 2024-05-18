import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useUserListStore = defineStore("userLIstStore", () => {
  const state = reactive({});
  const getUsers = () => {
    return [1, 2, 3];
  };

  return { getUsers, ...toRefs(state) };
});
