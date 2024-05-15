<template>
  <div>
    <div
      class="bg-backgroundColor flex justify-between items-center px-4 relative h-[5rem] md:h-max"
    >
      <div
        :class="[showNavLinks ? 'flex' : 'hidden']"
        class="gap-4 md:gap-6 px-6 md:flex flex-col md:flex-row absolute md:static top-[5rem] left-0 right-0 bg-backgroundColor shadow-inner top-0 shadow-lg md:shadow-none py-4"
      >
        <div v-for="(link, id) in navlinks" :key="id">
          <RouterLink
            v-if="link.forBoth || user?.roleId === ADMIN_ID"
            :to="link.route"
            :class="{
              'font-bold text-lg md:text-xl border-b-2 border-blue w-max':
                id === 0,
            }"
          >
            {{ link.text }}
          </RouterLink>
        </div>
      </div>
      <div @click="toggleNavlinks" class="md:hidden cursor-pointer">
        <Icon icon="ci:hamburger-lg" class="text-black w-6 h-6" />
      </div>
      <button
        @click="handleLogoutModal"
        class="flex gap-3 md:gap-6 items-center py-3 md:px-6"
      >
        <Icon
          class="text-black h-10 w-10 md:w-12 md:h-12"
          icon="mingcute:user-4-fill"
        />
        <div class="flex flex-col items-start">
          <div class="capitalize font-bold md:text-xl">
            {{ user?.firstName }} {{ user?.lastName }}
          </div>
          <div class="text-sm md:text-md">{{ user?.email }}</div>
        </div>
      </button>
    </div>
    <div class="flex justify-end">
      <button
        @click="logoutUser"
        v-if="showLogout"
        class="bg-backgroundColor p-4 w-[100vw] md:w-[15rem] py-4 absolute md:text-lg flex justify-center align-center gap-2 hover:bg-blue hover:text-white rounded-bl shadow-inner shadow-lg"
      >
        <Icon icon="material-symbols:logout" class="w-8 h-8 text-red" />
        <div>LOGOUT</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useNavbar } from "@/composables/navbar";
import { ADMIN_ID } from "@/constants";
const {
  user,
  navlinks,
  handleLogoutModal,
  showLogout,
  logoutUser,
  showNavLinks,
  toggleNavlinks,
} = useNavbar();
</script>
