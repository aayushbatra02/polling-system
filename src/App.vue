<template>
  <div>
    <nav-bar v-if="user && route.name !== 'NotFound'" />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { useAuthStore } from "./stores/authStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const route = useRoute();
</script>
