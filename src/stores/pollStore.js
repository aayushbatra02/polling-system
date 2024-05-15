import axios from "axios";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const usePollStore = defineStore("pollStore", () => {
  const state = reactive({
    pollList: [],
    loading: false,
    pageNo: 1,
    lastPage: false,
    pollDetails: {},
    showResultModal: false,
    resultLabels: [],
    resultValues: [],
  });

  const getPolls = async () => {
    try {
      state.loading = true;
      const res = await axios.get(`poll/list/${state.pageNo}?limit=10`);
      if (res?.status === 200) {
        if (res?.data?.rows.length !== 10) {
          state.lastPage = true;
        }
        if (state.pageNo === 1) {
          state.pollList = res?.data?.rows;
        } else {
          state.pollList = [...state.pollList, ...res?.data?.rows];
        }
      }
    } catch (e) {
      console.log(e?.response?.data?.message);
    } finally {
      state.loading = false;
    }
  };

  const votePoll = async (optionId) => {
    try {
      await axios.post("vote/count", {
        optionId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePoll = async (pollId) => {
    console.log(pollId)
    try {
      await axios.delete(`poll/${pollId}`);
      const updatedPollList = state.pollList.filter(
        (poll) => poll?.id !== pollId
      );
      state.pollList = updatedPollList;
    } catch (e) {
      console.log(e);
    }
  };

  const getSinglePoll = async (pollId) => {
    try {
      const res = await axios.get(`poll/${pollId}`);
      if (res?.status === 200) {
        state.pollDetails = res?.data;
        state.showResultModal = true;
        state.resultLabels = state.pollDetails.optionList?.map(
          (option) => option.optionTitle
        );

        state.resultValues = state.pollDetails.optionList?.map(
          (option) => option.totalVoteCount
        );
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    getPolls,
    votePoll,
    handleDeletePoll,
    getSinglePoll,
    ...toRefs(state),
  };
});
