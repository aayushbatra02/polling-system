<template>
  <div>
    <nav-bar v-if="user" />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { useAuthStore } from "./stores/authStore";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
