<template>
  <div
    class="border-2 border-blue p-4 pt-14 pb-8 rounded-lg bg-lightGray relative"
  >
    <div class="mb-4 flex gap-4 h-12">
      <div>{{ index + 1 }}.</div>
      <div>{{ poll.title }}</div>
    </div>
    <div class="flex flex-col gap-4 mb-8 md:mb-4">
      <div v-for="option in poll.optionList" :key="option.id">
        <label class="cursor-pointer">
          <input
            @change="setSelectedOptionId(option.id)"
            class="mr-4 cursor-pointer"
            type="radio"
            :name="option.pollId"
            :disabled="isPollSubmitted"
            :checked="selectedOption === option.id"
          />{{ option.optionTitle }}</label
        >
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="submitPoll(selectedOptionID, poll.id)"
        class="border px-4 border-blue py-1 rounded"
        :class="[
          isPollSubmitted || !selectedOptionID
            ? 'bg-backgroundColor cursor-no-drop text-blue'
            : 'hover:bg-[rgba(0,0,0,0)] hover:text-blue bg-blue text-white',
        ]"
        :disabled="isPollSubmitted || !selectedOptionID"
      >
        <span v-if="isPollSubmitted">Submitted</span>
        <span v-else> SUBMIT </span>
      </button>
      <button
        class="absolute top-4 right-4 flex gap-3"
        v-if="user?.roleId === ADMIN_ID"
      >
        <Icon class="w-6 h-6 text-blue" icon="ic:sharp-edit" />
        <Icon
          class="w-6 h-6 text-red"
          icon="material-symbols:delete"
          @click="showDeleteModal"
        />
        <Icon
          @click="showResult(poll.id)"
          class="w-6 h-6 text-blue"
          icon="uis:graph-bar"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, ref, defineEmits } from "vue";
import { usePollList } from "@/composables/pollList";
import { ADMIN_ID } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps(["poll", "index"]);
const emit = defineEmits(["toggleDeleteModal", "setDeletePollId"]);

const selectedOptionID = ref(null);
const { submitPoll, isPollSubmitted, showResult } = usePollList();
const { user } = storeToRefs(useAuthStore());
const submittedPolls = ref(null);
const selectedOption = ref(null);

onMounted(() => {
  submittedPolls.value = JSON.parse(localStorage.getItem("submittedPolls"));
  if (submittedPolls.value) {
    selectedOption.value = submittedPolls.value[props.poll.id];
    if (selectedOption.value) {
      isPollSubmitted.value = true;
    }
  }
});

const setSelectedOptionId = (id) => {
  selectedOptionID.value = id;
};

const showDeleteModal = () => {
  emit("toggleDeleteModal");
  emit("setDeletePollId", props.poll?.id);
};
</script>