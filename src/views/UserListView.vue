<template>
  <div class="p-4 md:p-10">
    <div v-if="loading"><spinning-loader :large="true" /></div>
    <div
      v-else
      class="mx-auto w-[100%] sm:w-[90%] md:w-[80%] xl:w-[60%] text-xs sm:text-sm md:text-base"
    >
      <h1 class="text-lg md:text-2xl font-bold mb-4 md:mb-8">USERS</h1>
      <table class="w-[100%]">
        <tr>
          <th
            class="text-blue border border-blue p-2 md:px-8 md:py-2 text-sm md:text-lg"
          >
            ID
          </th>
          <th
            class="text-blue border border-blue p-2 md:px-8 md:py-2 text-sm md:text-lg"
          >
            Name
          </th>
          <th
            class="text-blue border border-blue p-2 md:px-8 md:py-2 text-sm md:text-lg"
          >
            Email
          </th>
          <th
            class="text-blue border border-blue p-2 md:px-8 md:py-2 text-sm md:text-lg"
          >
            Role
          </th>
        </tr>
        <tr
          v-for="{ id, firstName, lastName, email, roleId } in users"
          :key="id"
        >
          <td
            class="border border-blue p-2 w-[10%] text-center md:px-8 md:py-2"
          >
            {{ id }}
          </td>
          <td
            class="border border-blue p-2 w-[25%] text-center md:px-8 md:py-2 capitalize"
          >
            {{ firstName }} {{ lastName }}
          </td>
          <td
            class="border border-blue p-2 w-[50%] text-center md:px-8 md:py-2 break-all"
          >
            {{ email }}
          </td>

          <td
            class="border border-blue p-2 w-[15%] text-center md:px-8 md:py-2"
            v-if="roleId === ADMIN_ID"
          >
            Admin
          </td>
          <td
            class="border border-blue text-xs w-[20%] md:text-base text-center md:px-8 md:py-2"
            v-else
          >
            User
          </td>
        </tr>
      </table>
      <div class="mt-8 flex gap-8 items-start md:items-center">
        <div class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <label for="rowCount">Rows Per Page</label>
          <select
            name="rowCount"
            class="px-2 md:px-4 py-1 border-2 border-blue cursor-pointer"
            v-model="limit"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="flex gap-4 items-center">
          <button
            :disabled="disablePrevButton"
            @click="prevPage"
            :class="[
              disablePrevButton
                ? 'cursor-not-allowed text-gray'
                : 'text-blue font-bold',
            ]"
          >
            &lt; &lt;
          </button>
          <span
            ><span class="text-gray">page no.</span>
            <span>{{ pageNumber }}</span></span
          >
          <button
            :disabled="disableNextButton"
            @click="nextPage"
            :class="[
              disableNextButton
                ? 'cursor-not-allowed text-gray'
                : 'text-blue font-bold',
            ]"
          >
            &gt; &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserList } from "@/composables/userList";
import { ADMIN_ID } from "@/constants";
import { useUserListStore } from "@/stores/userListStore";
import SpinningLoader from "@/components/SpinningLoader.vue";

const {
  limit,
  pageNumber,
  prevPage,
  nextPage,
  disablePrevButton,
  disableNextButton,
} = useUserList();
const { loading, users } = storeToRefs(useUserListStore());
</script>
