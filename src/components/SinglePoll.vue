<template>
  <div class="mb-8">
    <div class="mb-4">{{ poll.title }}</div>
    <div class="flex flex-col gap-4 mb-4">
      <div v-for="option in poll.optionList" :key="option.id">
        <label class="cursor-pointer">
          <input
            class="mr-4 cursor-pointer"
            type="radio"
            :name="option.pollId"
          />{{ option.optionTitle }}</label
        >
      </div>
    </div>
    <button
      class="border px-4 border-blue text-blue py-1 rounded hover:bg-blue hover:text-white"
    >
      SUBMIT
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["poll"]);

</script>

<style scoped>
</style>