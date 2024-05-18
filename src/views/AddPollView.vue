<template>
  <div>
    <div v-if="loading"><spinning-loader :large="true" /></div>
    <form
      v-else
      @submit.prevent="submitPoll"
      class="w-max m-auto p-4 md:p-12 flex flex-col gap-4 md:gap-8 rounded-xl bg-white border-2 border-blue my-20"
    >
      <div class="flex flex-col">
        <label class="md:text-xl mb-2 text-gray" for="title">Title</label>
        <input
          v-model.trim="title"
          class="p-1 md:p-2 border border-gray rounded w-[13rem] md:w-[30rem] bg-lightGray"
          type="text"
          name="title"
          @input="validateInput('title', title, 10)"
        />
        <div v-if="errorMessage.title" class="text-red mt-2">
          {{ errorMessage.title }}
        </div>
      </div>
      <div v-for="(option, index) in optionList" :key="index">
        <div class="flex flex-col">
          <label class="md:text-xl mb-2 text-gray" for="title"
            >Option {{ index + 1 }}</label
          >
          <div class="flex">
            <input
              v-model.trim="optionList[index].optionTitle"
              class="p-1 md:p-2 border border-gray rounded w-[13rem] md:w-[30rem] bg-lightGray"
              type="text"
              name="title"
              @input="
                validateInput(
                  `option ${index + 1}`,
                  optionList[index]?.optionTitle
                )
              "
            />
            <button
              type="button"
              class="md:ml-4"
              @click="deletePollOption(index)"
            >
              <Icon class="text-red w-8 h-8" icon="material-symbols:delete" />
            </button>
          </div>
        </div>
        <div v-if="errorMessage[`option ${index + 1}`]" class="text-red mt-2">
          {{ errorMessage[`option ${index + 1}`] }}
        </div>
      </div>
      <div>
        <button
          class="border border-gray w-max px-4 py-1 rounded hover:bg-gray hover:text-white"
          @click="addPollOption"
          type="button"
        >
          Add Option
        </button>
        <div v-if="errorMessage.minOptionsError" class="text-red mt-2">
          {{ errorMessage.minOptionsError }}
        </div>
      </div>

      <button
        type="submit"
        class="border w-[100%] m-auto text-blue py-1 md:py-2 rounded hover:bg-blue hover:text-white md:text-xl"
      >
        {{ submitButtonText }}
      </button>
    </form>
  </div>
</template>


<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useAddPoll } from "@/composables/addPoll";
import { usePollStore } from "@/stores/pollStore";
import SpinningLoader from "@/components/SpinningLoader.vue";

const {
  optionList,
  addPollOption,
  deletePollOption,
  title,
  submitPoll,
  errorMessage,
  validateInput,
  submitButtonText,
} = useAddPoll();

const { loading } = storeToRefs(usePollStore());
</script>