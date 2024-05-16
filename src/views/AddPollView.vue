<template>
  <div>
    <form
      @submit.prevent="submitPoll"
      class="w-max m-auto p-12 flex flex-col gap-8 rounded-xl bg-white border-2 border-blue my-20"
    >
      <div class="flex flex-col">
        <label class="text-xl mb-2 text-gray" for="title">Title</label>
        <input
          v-model="title"
          class="p-2 border border-gray rounded w-[30rem] bg-lightGray"
          type="text"
          name="title"
          @input="validate('title', title, 10)"
        />
        <div v-if="errorMessage.title" class="text-red mt-2">
          {{ errorMessage.title }}
        </div>
      </div>
      <div v-for="(option, index) in optionList" :key="index">
        <div class="flex flex-col">
          <label class="text-xl mb-2 text-gray" for="title"
            >Option {{ index + 1 }}</label
          >
          <div class="flex">
            <input
              v-model="optionList[index].optionTitle"
              class="p-2 border border-gray rounded w-[30rem] bg-lightGray"
              type="text"
              name="title"
              @input="
                validate(`option ${index + 1}`, optionList[index]?.optionTitle)
              "
            />
            <button
              type="button"
              v-if="optionList.length > 2"
              class="ml-4"
              @click="deleteOption(index)"
            >
              <Icon class="text-red w-8 h-8" icon="material-symbols:delete" />
            </button>
          </div>
        </div>
        <div v-if="errorMessage[`option ${index + 1}`]" class="text-red mt-2">
          {{ errorMessage[`option ${index + 1}`] }}
        </div>
      </div>
      <button
        class="border border-gray w-max px-4 py-1 rounded hover:bg-gray hover:text-white"
        @click="addOption"
        type="button"
      >
        Add Option
      </button>
      <button
        type="submit"
        class="border w-[100%] m-auto text-blue py-2 rounded hover:bg-blue hover:text-white text-xl"
      >
        {{ submitButtonText }}
      </button>
    </form>
  </div>
</template>


<script setup>
import { Icon } from "@iconify/vue";
import { useAddPoll } from "@/composables/addPoll";

const {
  optionList,
  addOption,
  deleteOption,
  title,
  submitPoll,
  errorMessage,
  validate,
  submitButtonText,
} = useAddPoll();
</script>