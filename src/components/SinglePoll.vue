<template>
  <div
    class="mb-8 border-2 border-blue p-4 pt-14 md:p-8 rounded-lg bg-lightGray relative"
  >
    <div class="mb-4 flex gap-4">
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
            :checked="isPollSubmitted?.optionId === option.id"
          />{{ option.optionTitle }}</label
        >
      </div>
    </div>
    <div class="text-red mb-4" v-if="pollSubmissionError">
      {{ pollSubmissionError }}
    </div>
    <div class="flex justify-center">
      <button
        @click="submitPoll(selectedOptionID, poll.id)"
        class="border px-4 border-blue py-1 rounded"
        :class="[
          isPollSubmitted
            ? 'bg-backgroundColor cursor-no-drop text-blue'
            : 'hover:bg-[rgba(0,0,0,0)] hover:text-blue bg-blue text-white',
        ]"
        :disabled="isPollSubmitted"
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
          @click="deletePoll(poll.id)"
          class="w-6 h-6 text-red"
          icon="material-symbols:delete"
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
import { defineProps, onMounted, ref } from "vue";

import { usePollList } from "@/composables/pollList";
import { ADMIN_ID } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps(["poll", "index"]);

const selectedOptionID = ref(null);
const {
  submitPoll,
  pollSubmissionError,
  isPollSubmitted,
  deletePoll,
  showResult,
} = usePollList();
const { user } = storeToRefs(useAuthStore());

onMounted(() => {
  const submittedPolls = JSON.parse(localStorage.getItem("submittedPolls"));
  if (submittedPolls) {
    isPollSubmitted.value = submittedPolls.find(
      (poll) => poll.pollId === props.poll.id
    );
  }
});

const setSelectedOptionId = (id) => {
  pollSubmissionError.value = null;
  selectedOptionID.value = id;
};
</script>