import { usePollStore } from "@/stores/pollStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
export const usePollList = () => {
  const pollStore = usePollStore();
  const { pollList, loading } = storeToRefs(pollStore);
  const { getPolls } = pollStore;

  const submitPoll = (pollId) => {
    console.log(`Submitted Poll: ${pollId}`)
  }

  watchEffect(() => getPolls());
  return { pollList, loading, submitPoll };
};
