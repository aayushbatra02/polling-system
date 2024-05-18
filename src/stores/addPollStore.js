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

  const handlePollTitleUpdate = async (pollId, title) => {
    try {
      await axios.put(`poll/${pollId}`, title);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddPollOption = async (optionId, option) => {
    try {
      await axios.post(`poll/addPollOption/${optionId}`, option);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePollOption = async (optionId) => {
    try {
      await axios.delete(`option/delete/${optionId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditPollOption = async (optionId, optionTitle) => {
    try {
      await axios.put(`option/edit/${optionId}`, optionTitle);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleAddPoll,
    handlePollTitleUpdate,
    handleAddPollOption,
    handleDeletePollOption,
    handleEditPollOption,
    ...toRefs(state),
  };
});
