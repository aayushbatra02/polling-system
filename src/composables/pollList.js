import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePollStore } from "@/stores/pollStore";

export const usePollList = () => {
  const pollStore = usePollStore();
  const { pageNo, showResultModal } = storeToRefs(pollStore);

  const { getPolls, votePoll, handleDeletePoll, getSinglePoll } = pollStore;
  const pollSubmissionError = ref(null);
  const isPollSubmitted = ref(false);
  const showDeleteModal = ref(false);

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

  const deletePoll = () => {
    handleDeletePoll();
    showDeleteModal.value = false;
  };

  const showResult = async (pollId) => {
    getSinglePoll(pollId);
  };

  const closeResultModal = () => {
    showResultModal.value = false;
  };

  const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
  };

  return {
    submitPoll,
    getPolls,
    pollSubmissionError,
    isPollSubmitted,
    loadMorePolls,
    deletePoll,
    showResult,
    showResultModal,
    closeResultModal,
    toggleDeleteModal,
    showDeleteModal,
  };
};
