import router from "@/router";
import { useAddPollStore } from "@/stores/addPollStore";
import { authenticate } from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

export const useAddPoll = () => {
  const {
    handleAddPoll,
    handlePollTitleUpdate,
    handleAddPollOption,
    handleDeletePollOption,
    handleEditPollOption,
  } = useAddPollStore();

  const { editPollDetails } = storeToRefs(useAddPollStore());

  const title = ref("");
  const optionList = ref([{ optionTitle: "" }, { optionTitle: "" }]);
  const validateForm = ref(false);
  const errorMessage = reactive({
    title: null,
  });
  const submitButtonText = ref("");
  const oldPollOptionLength = ref(editPollDetails?.value?.optionList.length);

  const clearOptionsError = () => {
    for (const key in errorMessage) {
      if (key !== "title") {
        errorMessage[key] = null;
      }
    }
  };

  const addPollOption = () => {
    optionList.value.push({ optionTitle: "" });
    clearOptionsError();
  };

  const deletePollOption = (id) => {
    if (editPollDetails.value) {
      if (id < oldPollOptionLength.value) {
        const deletedOptionId = editPollDetails.value.optionList[id].id;
        handleDeletePollOption(deletedOptionId);
      }
    }
    oldPollOptionLength.value = oldPollOptionLength.value - 1;
    optionList.value = optionList.value.filter((option, index) => index !== id);
    clearOptionsError();
  };

  const validate = (field, value, condition) => {
    if (validateForm.value) {
      errorMessage[field] = authenticate(field, value, condition);
    }
  };

  const isErrorPresent = () => {
    let isPresent = false;
    for (const key in errorMessage) {
      if (errorMessage[key]) {
        isPresent = true;
      }
    }
    return isPresent;
  };
  const submitPoll = async () => {
    validateForm.value = true;
    validate("title", title.value, 10);
    for (let i = 0; i < optionList.value.length; i++) {
      validate(`option ${i + 1}`, optionList?.value[i]?.optionTitle);
    }
    if (!isErrorPresent()) {
      if (editPollDetails.value) {
        //update poll title
        if (title.value !== editPollDetails.value.title) {
          handlePollTitleUpdate(editPollDetails.value.id, { title: title.value });
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

  onMounted(() => {
    if (editPollDetails.value) {
      title.value = editPollDetails.value.title;
      optionList.value = [...editPollDetails.value.optionList];
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
    validate,
    submitButtonText,
  };
};
