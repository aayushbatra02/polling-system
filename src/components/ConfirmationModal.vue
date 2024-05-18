<template>
  <div
    class="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center"
    :class="{ 'cursor-pointer': isClosable }"
    @click.self="hideModal"
  >
    <div
      class="bg-white w-[18rem] md:w-[25rem] px-[1rem] lg:px-[3rem] py-[2rem] lg:py-[4rem] rounded-lg flex justify-center items-center flex-col relative cursor-default"
    >
      <h1
        class="text-lg lg:text-2xl font-bold"
        :class="[isClosable ? 'text-red' : 'text-blue']"
      >
        {{ heading }}
      </h1>
      <p class="mt-4 text-lg text-center">{{ description }}</p>
      <div class="flex gap-8">
        <button
          @click="$emit('onConfirmButton')"
          class="border px-4 lg:px-6 py-1 rounded hover:text-white mt-8"
          :class="[
            isClosable
              ? 'border-red text-red hover:bg-red'
              : 'border-blue text-blue hover:bg-blue',
          ]"
        >
          {{ confirmButtonText }}
        </button>
        <button
          v-if="isClosable"
          @click="hideModal"
          class="border px-4 lg:px-6 py-1 rounded hover:text-white mt-8 border-blue text-blue hover:bg-blue"
        >
          Cancel
        </button>
      </div>

      <button v-if="isClosable" @click="hideModal">
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
  "isClosable",
]);
const emit = defineEmits(["onConfirmButton", "closeModal"]);

const hideModal = () => (props.isClosable ? emit("closeModal") : null);
</script>

