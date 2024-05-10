<template>
  <div>
    <nav-bar v-if="route.name !== 'Login' && route.name !== 'Signup'" />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const route = useRoute();
const currentPage = route.name;
const showNav = ref(true);
onMounted(() => {
  if (currentPage !== "Login" && currentPage !== "Signup") {
    showNav.value = false;
  }
});
</script>
