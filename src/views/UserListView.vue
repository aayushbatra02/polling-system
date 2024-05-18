<template>
  <div>USER LIST</div>
</template>

<script setup>
import { useUserList } from "@/composables/userList";

const { users } = useUserList();
console.log(users.value)
</script>
