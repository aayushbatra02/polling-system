<template>
  <div class="p-4 md:p-10">
    <div v-if="loading && pageNo === 1"><spinning-loader :large="true" /></div>
    <div class="w-[100%] xl:w-[90%] m-auto" v-else>
      <div class="text-lg md:text-2xl font-bold mb-4 md:mb-8">POLLS</div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-14"
      >
        <single-poll
          v-for="(poll, index) in pollList"
          :key="poll.id"
          :poll="poll"
          :index="index"
          @toggle-delete-modal="toggleDeleteModal"
        />
      </div>
      <div class="flex justify-center mt-8">
        <button
          v-if="!lastPage"
          @click="loadMorePolls"
          class="border px-4 py-1 rounded text-blue"
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
      <confirmation-modal
        heading="Confirm Delete"
        description="Are you sure you want to delete?"
        @on-confirm-button="deletePoll"
        @close-modal="toggleDeleteModal"
        confirmButtonText="Ok"
        :popup="true"
        v-if="showDeleteModal"
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
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { storeToRefs } from "pinia";
import { usePollStore } from "@/stores/pollStore";

const {
  loading,
  getPolls,
  loadMorePolls,
  lastPage,
  pollDetails,
  showResultModal,
  closeResultModal,
  resultLabels,
  resultValues,
  showDeleteModal,
  toggleDeleteModal,
  deletePoll,
} = usePollList();

const { pollList, pageNo } = storeToRefs(usePollStore());

onMounted(() => {
  getPolls();
});
</script>

