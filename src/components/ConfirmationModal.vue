<template>
  <div
    class="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center"
    :class="{ 'cursor-pointer': popup }"
    @click.self="hidePopup"
  >
    <div
      class="bg-white px-[1.5rem] lg:px-[3rem] py-[2rem] lg:py-[4rem] rounded-lg flex justify-center items-center flex-col relative cursor-default"
    >
      <h1
        class="text-lg lg:text-2xl font-bold text-red"
        :class="[popup ? 'text-blue' : 'text-blue']"
      >
        {{ heading }}
      </h1>
      <p class="mt-4 text-lg">{{ description }}</p>
      <button
        @click="$emit('onConfirmButton')"
        class="border px-4 lg:px-6 py-1 rounded hover:text-white mt-8"
        :class="[
          popup
            ? 'border-red text-red hover:bg-red'
            : 'border-blue text-blue hover:bg-blue',
        ]"
      >
        {{ confirmButtonText }}
      </button>
      <button v-if="popup" @click="hidePopup">
        <Icon
          class="w-10 h-10 absolute top-2 right-2 cursor-pointer"
          icon="basil:cross-solid"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps([
  "heading",
  "description",
  "confirmButtonText",
  "popup",
]);
const emit = defineEmits(["onConfirmButton", "closeModal"]);

const hidePopup = () => (props.popup ? emit('closeModal') : null);
</script>

