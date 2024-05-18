import router from "@/router";
import { useAddPollStore } from "@/stores/addPollStore";
import { authenticate } from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

export const useAddPoll = () => {
  const {
    handleAddPoll,
    handleTitleUpdate,
    handleAddOption,
    handleDeleteOption,
    handleEditOption,
  } = useAddPollStore();

  const { editPollDetails } = storeToRefs(useAddPollStore());

  const title = ref("");
  const optionList = ref([{ optionTitle: "" }, { optionTitle: "" }]);
  const validateForm = ref(false);
  const errorMessage = reactive({
    title: null,
  });
  const submitButtonText = ref("Add Poll");
  const oldPollOptionLength = ref(editPollDetails?.value?.optionList.length);

  const clearOptionsError = () => {
    for (const key in errorMessage) {
      if (key !== "title") {
        errorMessage[key] = null;
      }
    }
  };

  const addOption = () => {
    optionList.value.push({ optionTitle: "" });
    clearOptionsError();
  };

  const deleteOption = (id) => {
    if (editPollDetails.value) {
      if (id < oldPollOptionLength.value) {
        const deletedOptionId = editPollDetails.value.optionList[id].id;
        handleDeleteOption(deletedOptionId);
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
        console.log({
          newEdit: optionList.value,
        });
        //update title
        if (title.value !== editPollDetails.value.title) {
          handleTitleUpdate(editPollDetails.value.id, { title: title.value });
        }
        //add options
        const newPollOptionLength = optionList.value.length;
        if (newPollOptionLength > oldPollOptionLength.value) {
          const noOfOptionsAdded =
            newPollOptionLength - oldPollOptionLength.value;
          for (let i = 0; i < noOfOptionsAdded; i++) {
            const addedOption =
              optionList?.value[oldPollOptionLength.value + i];
            handleAddOption(editPollDetails.value.id, addedOption);
          }
        }
        // edit poll
        for (let i = 0; i < oldPollOptionLength.value; i++) {
          const id = optionList.value[i].id;
          const option = optionList.value[i];
          handleEditOption(id, option);
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
    }
  });

  return {
    optionList,
    addOption,
    deleteOption,
    title,
    submitPoll,
    errorMessage,
    validate,
    submitButtonText,
  };
};
