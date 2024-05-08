<template>
  <div class="bg-backgroungColor h-[100vh] flex justify-center items-center">
    <div class="bg-white p-5 md:p-10 lg:p-15 lg:px-20 flex flex-col items-center rounded-xl">
      <h1 class="text-2xl md:text-4xl font-bold md:mb-10">Login</h1>
      <div class="mt-8">
        <input
          class="border-b border-black md:p-2 outline-none"
          type="text"
          placeholder="Email"
          v-model.trim="loginData.email"
          @input="validateEmail"
        />
        <p class="text-red">{{ errorMessage.email }}</p>
      </div>
      <div class="my-8">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="loginData.password"
            @input="validatePassword"
          />
          <Icon
            v-if="showPassword"
            @click="togglePassword(false)"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
          />
          <Icon
            v-else
            @click="togglePassword(true)"
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
          />
        </div>
        <p class="text-red">{{ errorMessage.password }}</p>
      </div>
      <p class="text-red mb-4" v-if="error && showFetchError">{{ error }}</p>
      <button
        @click="loginHandler"
        class="mt-4 border-2 border-blue text-blue w-[100%] py-2 rounded-lg hover:bg-blue hover:text-white"
      >
        LOGIN
      </button>
      <p class="mt-8">
        Dont't have an account?
        <RouterLink to="/signup" class="text-blue ml-2">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { onMounted, reactive, ref } from "vue";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { error, isUserAuthenticated } = storeToRefs(authStore);

onMounted(() => {
  isUserAuthenticated.value = false;
});

const loginData = reactive({
  email: "",
  password: "",
});

const errorMessage = reactive({
  email: "",
  password: "",
});

const doValidation = ref(false);

const showFetchError = ref(false);

const loginHandler = () => {
  doValidation.value = true;
  validateEmail();
  validatePassword();
  if (!errorMessage.email && !errorMessage.password) {
    showFetchError.value = true;
    authStore.handleLogin(loginData.email, loginData.password);
  }
};

const checkEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateEmail = () => {
  showFetchError.value = false;
  if (doValidation.value) {
    if (!loginData.email) {
      errorMessage.email = "Email Required";
    } else if (!checkEmail(loginData.email)) {
      errorMessage.email = "Invalid Email";
    } else {
      errorMessage.email = "";
    }
  }
};

const validatePassword = () => {
  showFetchError.value = false;
  if (doValidation.value) {
    if (!loginData.password) {
      errorMessage.password = "Password Required";
    } else {
      errorMessage.password = "";
    }
  }
};

const showPassword = ref(false);

const togglePassword = (bool) => {
  showPassword.value = bool;
};
</script>