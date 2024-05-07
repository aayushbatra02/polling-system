<template>
  <div>
    <div class="font-bold text-2xl">HOME PAGE</div>
    <RouterLink class="text-blue-500" to="/login">GO TO LOGIN</RouterLink>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { isUserAuthenticated } = storeToRefs(authStore);
console.log(isUserAuthenticated.value);
if (!isUserAuthenticated.value) {
  router.push("/login");
}
</script>
