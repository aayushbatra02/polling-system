import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useAddPollStore = defineStore("addPollStore", () => {
  const state = reactive({
    test: 0,
    loading: false,
    editPollDetails: null,
  });

  const handleAddPoll = async (poll) => {
    try {
      state.loading = true;
      await axios.post("poll/add", poll);
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  const handleTitleUpdate = async (pollId, title) => {
    try {
      await axios.put(`poll/${pollId}`, title);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddOption = async (optionId, option) => {
    try {
      await axios.post(`poll/addPollOption/${optionId}`, option);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteOption = async (optionId) => {
    try {
      await axios.delete(`option/delete/${optionId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleAddPoll,
    handleTitleUpdate,
    handleAddOption,
    handleDeleteOption,
    ...toRefs(state),
  };
});
