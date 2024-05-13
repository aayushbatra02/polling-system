<template>
  <div>
    <div class="bg-backgroungColor flex justify-between items-center px-4 relative h-[7rem]">
      <div :class="[showNavLinks ? 'flex': 'hidden']" class="gap-4 md:gap-6 px-6 md:flex flex-col md:flex-row absolute md:static top-[7rem] left-0 right-0 bg-backgroungColor shadow-inner top-0 shadow-lg md:shadow-none py-4">
        <RouterLink to="/" class="font-bold text-lg md:text-xl border-b-2 border-blue w-max"
          >Polls</RouterLink
        >
        <div v-if="role === 'admin'" class="flex gap-4 md:gap-6 flex-col md:flex-row">
          <RouterLink to="/">Add Poll</RouterLink>
          <RouterLink to="/">Create User</RouterLink>
          <RouterLink to="/">List Users</RouterLink>
        </div>
      </div>
      <div @click="toggleNavlinks" class="md:hidden cursor-pointer">
        <Icon icon="ci:hamburger-lg" class="text-black w-6 h-6" />
      </div>
      <button
        @click="toggleLogout"
        class="flex gap-3 items-center flex-col md:px-12 py-3"
      >
        <div class="flex justify-between gap-6 items-center">
          <Icon class="text-black w-8 h-8" icon="mingcute:user-4-fill" />
          <div class="capitalize font-bold md:text-xl">
            {{ userData.firstName }}
          </div>
        </div>
        <div>{{ userData.email }}</div>
      </button>
    </div>
    <div class="flex justify-end">
      <button
        @click="logoutUser"
        v-if="showLogout"
        class="bg-backgroungColor m-2 p-4 md:w-[15rem] py-4 absolute md:text-lg flex justify-center align-center gap-2 hover:bg-blue hover:text-white rounded"
      >
        <Icon icon="material-symbols:logout" class="w-8 h-8 text-red" />
        <div>LOGOUT</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNavbar } from "@/composables/navbar";
import { Icon } from "@iconify/vue";

const { userData, role, toggleLogout, showLogout, logoutUser, showNavLinks, toggleNavlinks } = useNavbar();
</script>
