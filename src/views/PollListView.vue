<template>
  <div class="p-4 md:p-10">
    <div v-if="loading"><spinning-loader :large="true" /></div>
    <div class="w-[100%] md:w-[80%] xl:w-[60%] m-auto" v-else>
      <div class="text-lg md:text-2xl font-bold mb-4 md:mb-8">POLLS</div>
      <div class="flex flex-col">
        <single-poll
          v-for="(poll, index) in pollList"
          :key="poll.id"
          :poll="poll"
          :index="index"
        />
      </div>
      <div class="flex justify-center">
        <button
          :disabled="lastPage"
          @click="loadMorePolls"
          class="border px-4 py-1 rounded text-blue"
          :class="{ 'bg-backgroundColor cursor-not-allowed': lastPage }"
        >
          Load More Polls
        </button>
      </div>
      <result-modal
        v-if="showResultModal"
        :poll-details="pollDetails"
        :result-labels="resultLabels"
        :result-values="resultValues"
        @close-result-modal="closeResultModal"
        labelText="vote-count"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ResultModal from "@/components/ResultModal.vue";
import SinglePoll from "@/components/SinglePoll.vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { usePollList } from "@/composables/pollList";

const {
  pollList,
  loading,
  getPolls,
  loadMorePolls,
  lastPage,
  pollDetails,
  showResultModal,
  closeResultModal,
  resultLabels,
  resultValues,
} = usePollList();

onMounted(() => {
  getPolls();
});
</script>

