<template>
  <div class="flex justify-center items-center">
    <create-user-form title="Create User" type="create"/>
    <confirmation-modal
      heading="Congratulations!!!"
      description="New user is created successfully"
      @on-confirm-button="handleConfirmButton"
      confirmButtonText="OK"
      v-if="isFormSubmitted"
    />
  </div>
</template>

<script setup>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import CreateUserForm from "@/components/CreateUserForm.vue";
import { useSignup } from "@/composables/signup";

const { isFormSubmitted, handleConfirmButton } = useSignup();

</script>
