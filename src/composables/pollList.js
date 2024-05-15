import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePollStore } from "@/stores/pollStore";

export const usePollList = () => {
  const pollStore = usePollStore();
  const { pageNo, showResultModal } = storeToRefs(pollStore);

  const { getPolls, votePoll, handleDeletePoll, getSinglePoll } = pollStore;
  const isPollSubmitted = ref(false);
  const showDeleteModal = ref(false);
  const deletePollId = ref(null);

  const submitPoll = (optionId, pollId) => {
    let submittedPolls = JSON.parse(localStorage.getItem("submittedPolls"));
    if (!submittedPolls) {
      submittedPolls = {};
    }
    submittedPolls[pollId] = optionId;
    localStorage.setItem("submittedPolls", JSON.stringify(submittedPolls));
    isPollSubmitted.value = true;
    votePoll(optionId);
  };

  const loadMorePolls = () => {
    pageNo.value = pageNo.value + 1;
    getPolls();
  };

  const deletePoll = () => {
    handleDeletePoll(deletePollId.value);
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

  const setDeletePollId = (id) => {
    deletePollId.value = id;
  };

  return {
    submitPoll,
    getPolls,
    isPollSubmitted,
    loadMorePolls,
    deletePoll,
    showResult,
    showResultModal,
    closeResultModal,
    toggleDeleteModal,
    showDeleteModal,
    setDeletePollId,
  };
};
