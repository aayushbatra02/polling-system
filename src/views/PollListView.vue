<template>
  <div class="p-10">
    <div v-if="loading"><spinning-loader :large="true" /></div>
    <div v-else>
      <div class="text-2xl font-bold mb-8">POLLS</div>
      <single-poll v-for="poll in pollList" :key="poll.id" :poll="poll" />
    </div>
  </div>
</template>

<script setup>
import SinglePoll from "@/components/SinglePoll.vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { usePollList } from "@/composables/pollList";
const { pollList, loading } = usePollList();
console.log(pollList.value);
</script>

