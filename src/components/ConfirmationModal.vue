<template>
  <div
    class="absolute w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div
      class="bg-white px-[1.5rem] lg:px-[3rem] py-[2rem] lg:py-[4rem] rounded-lg flex justify-center items-center flex-col"
    >
      <h1 class="text-lg lg:text-2xl font-bold text-blue">{{ heading }}</h1>
      <p class="mt-4 text-lg">{{ para }}</p>
      <button
        @click="$emit('confirmButtonHandler')"
        class="border border-blue text-blue px-4 lg:px-6 py-1 rounded hover:bg-blue hover:text-white mt-8"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["heading", "para"]);
defineEmits(["confirmButtonHandler"]);
</script>

