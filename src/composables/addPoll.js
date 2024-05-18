import router from "@/router";
import { useAddPollStore } from "@/stores/addPollStore";
import { usePollStore } from "@/stores/pollStore";
import { authenticate } from "@/utils/authenticate";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useAddPoll = () => {
  const {
    handleAddPoll,
    handlePollTitleUpdate,
    handleAddPollOption,
    handleDeletePollOption,
    handleEditPollOption,
  } = useAddPollStore();

  const title = ref("");
  const optionList = ref([{ optionTitle: "" }, { optionTitle: "" }]);
  const validateForm = ref(false);
  const errorMessage = reactive({
    title: null,
    minOptionsError: null,
  });
  const editPollDetails = ref({});
  const submitButtonText = ref("");
  const oldPollOptionLength = ref(null);

  const clearOptionsError = () => {
    for (const key in errorMessage) {
      if (key !== "title") {
        errorMessage[key] = null;
      }
    }
  };

  const addPollOption = () => {
    errorMessage.minOptionsError = null;
    optionList.value.push({ optionTitle: "" });
    clearOptionsError();
  };

  const deletePollOption = (id) => {
    validateMinOptions();
    if (!errorMessage.minOptionsError) {
      if (editPollDetails.value) {
        if (id < oldPollOptionLength.value) {
          const deletedOptionId = editPollDetails.value.optionList[id].id;
          handleDeletePollOption(deletedOptionId);
        }
      }
      oldPollOptionLength.value = oldPollOptionLength.value - 1;
      optionList.value = optionList.value.filter(
        (option, index) => index !== id
      );
      clearOptionsError();
    }
  };

  const validateInput = (field, value, condition) => {
    if (validateForm.value) {
      errorMessage[field] = authenticate(field, value, condition);
    }
  };

  const validateMinOptions = () => {
    if (optionList.value.length <= 2) {
      errorMessage.minOptionsError = `Minimum Two Options Required`;
    }
  };

  const isErrorPresent = () => {
    let isPresent = false;
    for (const key in errorMessage) {
      if (errorMessage[key] && key !=='minOptionsError') {
        isPresent = true;
      }
    }
    return isPresent;
  };
  const submitPoll = async () => {
    validateForm.value = true;
    validateInput("title", title.value, 10);
    for (let i = 0; i < optionList.value.length; i++) {
      validateInput(`option ${i + 1}`, optionList?.value[i]?.optionTitle);
    }
    if (!isErrorPresent()) {
      if (editPollDetails.value) {
        //update poll title
        if (title.value !== editPollDetails?.value?.title) {
          handlePollTitleUpdate(editPollDetails.value.id, {
            title: title.value,
          });
        }

        //add poll options
        const newPollOptionLength = optionList.value.length;
        if (newPollOptionLength > oldPollOptionLength.value) {
          const noOfOptionsAdded =
            newPollOptionLength - oldPollOptionLength.value;
          for (let i = 0; i < noOfOptionsAdded; i++) {
            const addedOption =
              optionList?.value[oldPollOptionLength.value + i];
            handleAddPollOption(editPollDetails.value.id, addedOption);
          }
        }
        // edit poll
        for (let i = 0; i < oldPollOptionLength.value; i++) {
          const id = optionList.value[i].id;
          const option = optionList.value[i];
          handleEditPollOption(id, option);
        }
      } else {
        const poll = {
          title: title.value,
          options: optionList.value,
        };
        handleAddPoll(poll);
      }
      router.push("/");
    }
  };

  onMounted(async () => {
    const route = useRoute();
    const editId = route.params.id;

    if (editId) {
      const { getPolls } = usePollStore();
      const pollList = await getPolls();
      editPollDetails.value = pollList.find(
        (poll) => poll.id === Number(editId)
      );
      oldPollOptionLength.value = editPollDetails?.value?.optionList?.length;
      title.value = editPollDetails.value?.title;
      optionList.value = [...editPollDetails.value?.optionList];
      submitButtonText.value = "Edit Poll";
    } else {
      submitButtonText.value = "Add Poll";
    }
  });

  return {
    optionList,
    addPollOption,
    deletePollOption,
    title,
    submitPoll,
    errorMessage,
    validateInput,
    submitButtonText,
  };
};
