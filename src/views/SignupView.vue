<template>
  <div class="bg-backgroungColor h-[100vh] flex justify-center items-center">
    <form
      class="bg-white p-5 md:p-10 lg:p-15 flex flex-col items-center rounded-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:[25%]"
    >
      <h1 class="text-2xl md:text-4xl font-bold md:mb-10">Signup</h1>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="First Name"
        />
        <p class="text-red"></p>
      </div>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="Last Name"
        />
        <p class="text-red"></p>
      </div>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="email"
          placeholder="Email"
        />
        <p class="text-red"></p>
      </div>
      <div class="mt-8 w-[90%]">
        <input
          class="border-b border-black md:p-2 outline-none w-[100%]"
          type="text"
          placeholder="Role"
        />
        <p class="text-red"></p>
      </div>
      <div class="mt-8 mb-4 w-[90%]">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none w-[100%]"
            placeholder="Password"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
          />
        </div>
        <p class="text-red"></p>
      </div>
      <div class="mt-8 mb-4 w-[90%]">
        <div class="flex relative">
          <input
            class="md:p-2 border-b border-black outline-none w-[100%]"
            placeholder="Confirm Password"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-off-outline"
          />
          <Icon
            class="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
            icon="mdi:eye-outline"
          />
        </div>
        <p class="text-red"></p>
      </div>
      <p class="text-red"></p>
      <button
        type="submit"
        class="mt-4 border-2 border-blue text-blue w-[80%] h-12 rounded-lg hover:bg-blue hover:text-white relative"
      >
        <span
          v-if="false"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            class="inline-block w-4 h-4 border-t-2 border-blue-dark rounded-full animate-spin"
          ></span>
        </span>
        <span v-else  >SIGNUP</span>
      </button>
      <p class="mt-5">
        Already have an account?
        <RouterLink to="/login" class="text-blue ml-2">Login</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
</script>