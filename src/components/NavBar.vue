<template>
  <div>
    <div class="bg-backgroungColor flex justify-between items-center">
      <div class="flex gap-6 px-6">
        <RouterLink to="/" class="font-bold text-xl border-b-2 border-blue"
          >Polls</RouterLink
        >
        <div v-if="role === 'admin'" class="flex gap-6">
          <RouterLink to="/">Add Poll</RouterLink>
          <RouterLink to="/">Create User</RouterLink>
          <RouterLink to="/">List Users</RouterLink>
        </div>
      </div>
      <button
        @click="toggleLogout"
        class="flex gap-3 items-center flex-col px-6 py-3"
      >
        <div class="flex justify-between gap-6 items-center">
          <Icon class="text-black w-8 h-8" icon="mingcute:user-4-fill" />
          <div class="capitalize font-bold text-xl">
            {{ userData.firstName }}
          </div>
        </div>
        <div>{{ userData.email }}</div>
      </button>
    </div>
    <div class="flex justify-end">
      <button
        v-if="showLogout"
        class="bg-backgroungColor m-4 w-[15rem] py-4 absolute text-lg flex justify-center align-center gap-2 hover:bg-blue hover:text-white"
      >
        <Icon icon="material-symbols:logout" class="w-8 h-8" />
        <div>LOGOUT</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNavbar } from "@/composables/navbar";
import { Icon } from "@iconify/vue";

const { userData, role, toggleLogout, showLogout } = useNavbar();
</script>
