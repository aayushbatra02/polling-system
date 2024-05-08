<template>
  <div class="bg-backgroungColor h-[100vh] flex justify-center items-center">
    <form
      @submit.prevent="loginHandler"
      class="bg-white p-5 md:p-10 lg:p-15 flex flex-col items-center rounded-xl w-[40%]"
    >
      <h1 class="text-2xl md:text-4xl font-bold md:mb-10">Login</h1>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="Email"
          v-model.trim="loginData.email"
          @input="validateEmail"
        />
        <p class="text-red">{{ errorMessage.email }}</p>
      </div>
      <div class="mt-8 mb-4 w-[90%]">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none w-[100%]"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="loginData.password"
            @input="validatePassword"
          />
          <Icon
            v-if="showPassword"
            @click="togglePassword()"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
          />
          <Icon
            v-else
            @click="togglePassword()"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
          />
        </div>
        <p class="text-red">{{ errorMessage.password }}</p>
      </div>
      <p class="text-red" v-if="loginError && showLoginError">
        {{ loginError }}
      </p>
      <button
        :disabled="loading"
        type="submit"
        class="mt-4 border-2 border-blue text-blue w-[80%] h-12 rounded-lg hover:bg-blue hover:text-white relative"
      >
        <span
          v-if="loading"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            class="inline-block w-4 h-4 border-t-2 border-blue-dark rounded-full animate-spin"
          ></span>
        </span>
        <span v-else>LOGIN</span>
      </button>
      <p class="mt-5">
        Dont't have an account?
        <RouterLink to="/signup" class="text-blue ml-2">Sign up</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { useLogin } from "@/composables/login";
import { Icon } from "@iconify/vue";

const {
  loginData,
  validateEmail,
  errorMessage,
  showPassword,
  showLoginError,
  validatePassword,
  togglePassword,
  loginError,
  loginHandler,
  loading,
} = useLogin();
</script>