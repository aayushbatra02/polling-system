<template>
  <div
    class="absolute w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div
      class="bg-white px-[1.5rem] lg:px-[3rem] py-[2rem] lg:py-[4rem] rounded-lg flex justify-center items-center flex-col gap-8"
    >
      <h1 class="text-lg lg:text-2xl font-bold">{{ message }}</h1>
      <button
        @click="$emit('primaryButtonHandler')"
        class="border border-blue text-blue px-4 lg:px-6 py-1 rounded hover:bg-blue hover:text-white"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["message", "routeName"]);
defineEmits(["primaryButtonHandler"]);
</script>

