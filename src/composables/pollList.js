import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePollStore } from "@/stores/pollStore";

export const usePollList = () => {
  const pollStore = usePollStore();
  const {
    pollList,
    loading,
    pageNo,
    lastPage,
    pollDetails,
    showResultModal,
    resultLabels,
    resultValues,
  } = storeToRefs(pollStore);
  const { getPolls, votePoll, handleDeletePoll, getSinglePoll } = pollStore;
  const pollSubmissionError = ref(null);
  const isPollSubmitted = ref(false);

  const submitPoll = (optionId, pollId) => {
    let submittedPolls = JSON.parse(localStorage.getItem("submittedPolls"));
    if (!submittedPolls) {
      submittedPolls = [];
    }
    if (optionId === null) {
      pollSubmissionError.value = "Please Select an Option before submitting";
    } else {
      pollSubmissionError.value = null;
      submittedPolls.push({ pollId, optionId });
      localStorage.setItem("submittedPolls", JSON.stringify(submittedPolls));
      isPollSubmitted.value = { pollId, optionId };
      votePoll(optionId);
    }
  };

  const loadMorePolls = () => {
    pageNo.value = pageNo.value + 1;
    getPolls();
  };

  const deletePoll = (pollId) => {
    handleDeletePoll(pollId);
  };

  const showResult = async (pollId) => {
    getSinglePoll(pollId);
  };

  const closeResultModal = () => {
    showResultModal.value = false;
  };

  return {
    pollList,
    loading,
    submitPoll,
    getPolls,
    pollSubmissionError,
    isPollSubmitted,
    loadMorePolls,
    lastPage,
    deletePoll,
    showResult,
    pollDetails,
    showResultModal,
    closeResultModal,
    resultLabels,
    resultValues,
  };
};
