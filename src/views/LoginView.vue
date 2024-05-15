<template>
  <div class="bg-backgroundColor h-[100vh] flex justify-center items-center">
    <form
      @submit.prevent="onLogin"
      class="bg-white p-5 md:p-10 lg:p-15 flex flex-col items-center rounded-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:[25%]"
      novalidate
    >
      <h1 class="text-2xl md:text-4xl font-bold md:mb-10">Login</h1>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="email"
          placeholder="Email"
          v-model.trim="loginData.email"
          @input="validate('email')"
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
            @input="validate('password')"
          />
          <Icon
            v-if="showPassword"
            @click="togglePassword()"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
          />
          <Icon
            v-else
            @click="togglePassword()"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
          />
        </div>
        <p class="text-red">{{ errorMessage.password }}</p>
      </div>
      <p class="text-red text-left w-[90%]" v-if="loginError && showLoginError">
        {{ loginError }}
      </p>
      <button
        :disabled="loading"
        type="submit"
        class="mt-4 border-2 border-blue text-blue w-[80%] h-12 rounded-lg hover:bg-blue hover:text-white relative"
      >
        <spinning-loader v-if="loading" />
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
import { Icon } from "@iconify/vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { useLogin } from "@/composables/login";
import { useTogglePassword } from "@/composables/togglePassword";

const {
  loginData,
  errorMessage,
  showLoginError,
  loginError,
  onLogin,
  loading,
  validate,
} = useLogin();

const { showPassword, togglePassword } = useTogglePassword();
</script>