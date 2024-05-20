<template>
  <div class="p-4 md:p-10">
    <div v-if="loading"><spinning-loader :large="true" /></div>
    <div v-else class="mx-auto w-[80%]">
      <h1 class="text-lg md:text-2xl font-bold mb-4 md:mb-8">USERS</h1>
      <table>
        <tr>
          <th class="text-blue border border-blue w-[25%] px-8 py-2 text-lg">
            Sno.
          </th>
          <th class="text-blue border border-blue w-[25%] px-8 py-2 text-lg">
            Name
          </th>
          <th class="text-blue border border-blue w-[25%] px-8 py-2 text-lg">
            Email
          </th>
          <th class="text-blue border border-blue w-[25%] px-8 py-2 text-lg">
            Role
          </th>
        </tr>
        <tr
          v-for="({ id, firstName, lastName, email, roleId }, index) in users"
          :key="id"
        >
          <td class="border border-blue text-center px-8 py-2">
            {{ index + 1 }}
          </td>
          <td class="border border-blue text-center px-8 py-2">
            {{ firstName }} {{ lastName }}
          </td>
          <td class="border border-blue text-center px-8 py-2">{{ email }}</td>

          <td
            class="border border-blue text-center px-8 py-2"
            v-if="roleId === ADMIN_ID"
          >
            Admin
          </td>
          <td class="border border-blue text-center px-8 py-2" v-else>User</td>
        </tr>
      </table>
      <div class="mt-4 flex gap-8">
        <div>
          <label for="rowCount" class="mr-4">Rows Per Page</label>
          <select
            name="rowCount"
            class="px-4 py-1 border-2 border-blue cursor-pointer"
            v-model="rows"
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
              disablePrevButton ? 'cursor-not-allowed text-gray' : 'text-blue font-bold',
            ]"
          >
            &lt; &lt;
          </button>
          <span>{{ pageNumber }}</span>
          <button
            :disabled="disableNextButton"
            @click="nextPage"
            :class="[
              disableNextButton ? 'cursor-not-allowed text-gray' : 'text-blue font-bold',
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
import { onUpdated } from "vue";
import { useUserList } from "@/composables/userList";
import { ADMIN_ID } from "@/constants";
import { useUserListStore } from "@/stores/userListStore";
import SpinningLoader from "@/components/SpinningLoader.vue";

const {
  users,
  rows,
  pageNumber,
  prevPage,
  nextPage,
  disablePrevButton,
  disableNextButton,
} = useUserList();
const { loading } = storeToRefs(useUserListStore());

onUpdated(() => console.log("----"));
</script>
