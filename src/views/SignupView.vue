<template>
  <div
    class="bg-backgroungColor min-h-[100vh] h-max flex justify-center items-center"
  >
    <form
      @submit.prevent="signupHandler"
      class="bg-white p-5 md:p-10 lg:p-15 flex flex-col items-center rounded-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:[25%] md:m-[5rem]"
      novalidate
    >
      <h1 class="text-2xl md:text-4xl font-bold md:mb-10">Signup</h1>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="First Name"
          v-model="signupData.firstName"
          @input="validateFirstName"
        />
        <p class="text-red">{{ errorMessage.firstName }}</p>
      </div>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="Last Name"
          v-model="signupData.lastName"
          @input="validateLastName"
        />
        <p class="text-red">{{ errorMessage.lastName }}</p>
      </div>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="email"
          placeholder="Email"
          v-model="signupData.email"
          @input="validateEmail"
        />
        <p class="text-red">{{ errorMessage.email }}</p>
      </div>
      <div class="mt-8 w-[90%]">
        <select
          class="p-2 border border-black rounded w-[100%] bg-white"
          v-model="signupData.role"
          @change="validateRole"
        >
          <option disabled value="">Please Select a Role</option>
          <option v-for="role in roles" :value="role.id" :key="role.id">
            {{ role.name }}
          </option>
        </select>
        <p class="text-red">{{ errorMessage.role }}</p>
      </div>
      <div class="mt-8 mb-4 w-[90%]">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none w-[100%]"
            placeholder="Password"
            v-model="signupData.password"
            @input="validatePassword"
            :type="showPassword ? 'text' : 'password'"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
            @click="togglePassword()"
            v-if="!showPassword"
          />
          <Icon
            v-else
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
            @click="togglePassword()"
          />
        </div>
        <p class="text-red">{{ errorMessage.password }}</p>
      </div>
      <div class="mt-8 mb-4 w-[90%]">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none w-[100%]"
            placeholder="Confirm Password"
            v-model="signupData.confirmPassword"
            @input="validateConformPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
            @click="toggleConfirmPassword()"
            v-if="!showConfirmPassword"
          />
          <Icon
            v-else
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
            @click="toggleConfirmPassword()"
          />
        </div>
        <p class="text-red">{{ errorMessage.confirmPassword }}</p>
      </div>
      <p v-if="showSignupError" class="text-red w-[90%] text-left">
        {{ error }}
      </p>
      <button
        type="submit"
        class="mt-4 border-2 border-blue text-blue w-[80%] h-12 rounded-lg hover:bg-blue hover:text-white relative"
      >
        <spinning-loader v-if="loading" />
        <span v-else>SIGNUP</span>
      </button>
      <p class="mt-5">
        Already have an account?
        <RouterLink to="/login" class="text-blue ml-2">Login</RouterLink>
      </p>
    </form>
    <confirmation-modal
      :message="signupMessage"
      @primary-button-handler="routeToLogin"
      v-if="signupMessage"
    />
  </div>
</template>

<script setup>
import SpinningLoader from "@/components/SpinningLoader.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useSignup } from "@/composables/signup";
import { Icon } from "@iconify/vue";
const {
  signupHandler,
  signupData,
  errorMessage,
  validateFirstName,
  validateLastName,
  validateEmail,
  roles,
  validateRole,
  validatePassword,
  validateConformPassword,
  routeToLogin,
  loading,
  error,
  showSignupError,
  signupMessage,
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
} = useSignup();
</script>