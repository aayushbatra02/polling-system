<template>
  <div
    class="bg-backgroundColor min-h-[100vh] h-max flex justify-center items-center"
  >
    <create-user-form title="Signup" :signup="true" type="register"/>
    <confirmation-modal
      heading="Congratulations!!!"
      description="You have Signed up successfully"
      @on-confirm-button="() => handleConfirmButton('/login')"
      confirmButtonText="OK"
      v-if="isFormSubmitted"
    />
  </div>
</template>

<script setup>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useSignup } from "@/composables/signup";
import CreateUserForm from "@/components/CreateUserForm.vue";

const { handleConfirmButton, isFormSubmitted } = useSignup();
</script>