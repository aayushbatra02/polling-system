<template>
  <div class="bg-backgroungColor h-[100vh] flex justify-center items-center">
    <div class="bg-white p-10 flex flex-col items-center rounded-xl">
      <h1 class="text-4xl font-bold mb-10">Login</h1>
      <div class="mt-8">
        <input
          class="border-b border-black p-2 outline-none"
          type="text"
          placeholder="Email"
          v-model.trim="loginData.email"
          @input="validateEmail"
        />
        <p class="text-red">{{ errorMessage.email }}</p>
      </div>
      <div class="mt-8">
        <input
          class="border-b border-black p-2 outline-none"
          type="password"
          placeholder="Password"
          v-model="loginData.password"
          @input="validatePassword"
        />
        <p class="text-red">{{ errorMessage.password }}</p>
      </div>
      <button
        @click="loginHandler"
        class="mt-10 border-2 border-blue text-blue w-[80%] py-2 rounded-lg hover:bg-blue hover:text-white"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const loginData = reactive({
  email: "",
  password: "",
});

const errorMessage = reactive({
  email: "",
  password: "",
});

const doValidation = ref(false);

const loginHandler = () => {
  doValidation.value = true;
  validateEmail();
  validatePassword();
  if (!errorMessage.email && !errorMessage.password) {
    console.log("Logged In");
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
  if (doValidation.value) {
    if (!loginData.email) {
      errorMessage.email = "Email Required";
    } else if(!checkEmail(loginData.email)) {
      errorMessage.email = 'Invalid Email'
    } else {
      errorMessage.email = "";
    }
  }
};

const validatePassword = () => {
  if (doValidation.value) {
    if (!loginData.password) {
      errorMessage.password = "Password Required";
    } else {
      errorMessage.password = "";
    }
  }
};
</script>