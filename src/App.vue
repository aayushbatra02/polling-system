<template>
  <div>
    <nav-bar v-if="route.name !== 'Login' && route.name !== 'Signup'" />
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
const route = useRoute();
</script>
